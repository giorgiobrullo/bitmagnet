-- +goose Up
-- +goose StatementBegin

CREATE TABLE IF NOT EXISTS torrent_snapshots (
  recorded_at   timestamptz  NOT NULL DEFAULT now(),
  total_count   int          NOT NULL DEFAULT 0,
  total_size    bigint       NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_torrent_snapshots_recorded_at ON torrent_snapshots (recorded_at);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP TABLE IF EXISTS torrent_snapshots;

-- +goose StatementEnd
