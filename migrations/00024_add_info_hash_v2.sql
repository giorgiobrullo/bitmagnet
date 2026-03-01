-- +goose Up
ALTER TABLE torrents ADD COLUMN IF NOT EXISTS info_hash_v2 bytea;
ALTER TABLE torrents ADD COLUMN IF NOT EXISTS meta_version smallint NOT NULL DEFAULT 1;
CREATE INDEX IF NOT EXISTS idx_torrents_info_hash_v2 ON torrents (info_hash_v2) WHERE info_hash_v2 IS NOT NULL;

-- +goose Down
DROP INDEX IF EXISTS idx_torrents_info_hash_v2;
ALTER TABLE torrents DROP COLUMN IF EXISTS meta_version;
ALTER TABLE torrents DROP COLUMN IF EXISTS info_hash_v2;
