-- +goose Up
-- +goose StatementBegin

-- =============================================================================
-- 1. TORRENT_FILES: Swap PK from (info_hash, path) to (info_hash, index)
-- =============================================================================
-- The (info_hash, path) composite PK creates the largest index in the database:
-- at 273M rows the PK index alone is ~36GB because each leaf stores the 20-byte
-- hash + full file path text. The (info_hash, index) unique constraint is already
-- present and sufficient for deduplication (4-byte integer vs variable-length text).
-- Promoting it to PK and dropping the old one saves ~30GB at scale.
-- See: https://github.com/bitmagnet-io/bitmagnet/issues/191

-- Idempotent: only swap if PK still includes the 'path' column.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_attribute a
        JOIN pg_constraint c ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
        WHERE c.conrelid = 'torrent_files'::regclass
        AND c.contype = 'p'
        AND a.attname = 'path'
    ) THEN
        -- Drop the UNIQUE constraint on (info_hash, index) first; its underlying
        -- index is owned by the constraint and cannot be reused via USING INDEX.
        ALTER TABLE torrent_files DROP CONSTRAINT IF EXISTS torrent_files_info_hash_index_key;
        -- Drop the old composite PK (drops its B-tree index, freeing the most space).
        ALTER TABLE torrent_files DROP CONSTRAINT torrent_files_pkey;
        -- Create new PK on (info_hash, index) directly.
        ALTER TABLE torrent_files ADD CONSTRAINT torrent_files_pkey
            PRIMARY KEY (info_hash, "index");
    END IF;
END $$;

-- =============================================================================
-- 2. CONTENT_ATTRIBUTES: Drop redundant unique constraint identical to PK
-- =============================================================================
-- The table has both PRIMARY KEY (...) and UNIQUE (...) on the exact same columns.
-- The unique constraint and its index are 100% redundant.
DO $$
DECLARE cname text;
BEGIN
    SELECT conname INTO cname FROM pg_constraint
    WHERE conrelid = 'content_attributes'::regclass AND contype = 'u';
    IF cname IS NOT NULL THEN
        EXECUTE 'ALTER TABLE content_attributes DROP CONSTRAINT ' || quote_ident(cname);
    END IF;
END $$;

-- =============================================================================
-- 3. Drop indexes redundant via leftmost-prefix rule
-- =============================================================================
-- content(type): covered by PK (type, source, id)
DROP INDEX IF EXISTS content_type_idx;
-- content_collections(type): covered by PK (type, source, id)
DROP INDEX IF EXISTS content_collections_type_idx;
-- content_collections_content(content_type): covered by PK leftmost prefix
DROP INDEX IF EXISTS content_collections_content_content_type_idx;
-- content_attributes(source): covered by composite (source, key)
DROP INDEX IF EXISTS content_attributes_source_idx;
-- torrent_contents(content_type): covered by (content_type, updated_at)
DROP INDEX IF EXISTS torrent_contents_content_type_idx;
-- torrent_contents(content_source): covered by (content_source, content_id)
DROP INDEX IF EXISTS torrent_contents_content_source_idx;

-- =============================================================================
-- 4. CONTENT_COLLECTIONS_CONTENT: Replace 5 single-column indexes with 1 composite
-- =============================================================================
-- The 6 individual column indexes are useless for any real query pattern.
-- The PK already covers forward lookups (content -> collections) via leftmost prefix.
-- Replace the remaining 5 with one composite for reverse lookups (collection -> content).
DROP INDEX IF EXISTS content_collections_content_content_source_idx;
DROP INDEX IF EXISTS content_collections_content_content_id_idx;
DROP INDEX IF EXISTS content_collections_content_content_collection_type_idx;
DROP INDEX IF EXISTS content_collections_content_content_collection_source_idx;
DROP INDEX IF EXISTS content_collections_content_content_collection_id_idx;

CREATE INDEX IF NOT EXISTS content_collections_content_collection_lookup_idx
    ON content_collections_content (
        content_collection_type, content_collection_source, content_collection_id
    );

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- Revert torrent_files PK (only if PK is currently on (info_hash, index))
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_attribute a
        JOIN pg_constraint c ON a.attrelid = c.conrelid AND a.attnum = ANY(c.conkey)
        WHERE c.conrelid = 'torrent_files'::regclass
        AND c.contype = 'p'
        AND a.attname = 'path'
    ) THEN
        ALTER TABLE torrent_files DROP CONSTRAINT torrent_files_pkey;
        ALTER TABLE torrent_files ADD PRIMARY KEY (info_hash, path);
        ALTER TABLE torrent_files ADD UNIQUE (info_hash, "index");
    END IF;
END $$;

-- Revert content_attributes unique constraint
ALTER TABLE content_attributes
    ADD UNIQUE (content_type, content_source, content_id, source, key);

-- Restore dropped indexes
CREATE INDEX ON content (type);
CREATE INDEX ON content_collections (type);
CREATE INDEX ON content_collections_content (content_type);
CREATE INDEX ON content_attributes (source);
CREATE INDEX ON torrent_contents (content_type);
CREATE INDEX ON torrent_contents (content_source);

-- Restore individual column indexes on content_collections_content
DROP INDEX IF EXISTS content_collections_content_collection_lookup_idx;
CREATE INDEX ON content_collections_content (content_source);
CREATE INDEX ON content_collections_content (content_id);
CREATE INDEX ON content_collections_content (content_collection_type);
CREATE INDEX ON content_collections_content (content_collection_source);
CREATE INDEX ON content_collections_content (content_collection_id);

-- +goose StatementEnd
