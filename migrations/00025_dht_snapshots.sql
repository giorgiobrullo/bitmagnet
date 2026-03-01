-- +goose Up

CREATE TABLE IF NOT EXISTS dht_snapshots (
  recorded_at  timestamptz  NOT NULL DEFAULT now(),
  nodes_ipv4   int          NOT NULL DEFAULT 0,
  nodes_ipv6   int          NOT NULL DEFAULT 0,
  hashes_ipv4  int          NOT NULL DEFAULT 0,
  hashes_ipv6  int          NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_dht_snapshots_recorded_at ON dht_snapshots (recorded_at);

-- +goose Down

DROP TABLE IF EXISTS dht_snapshots;
