-- +goose Up
ALTER TABLE torrent_snapshots ADD COLUMN IF NOT EXISTS classified_count int NOT NULL DEFAULT 0;

-- +goose Down
ALTER TABLE torrent_snapshots DROP COLUMN IF EXISTS classified_count;
