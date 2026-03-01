-- +goose Up
-- +goose StatementBegin

-- Create a partial expression index that matches the exact ORDER BY used
-- by the queue job polling query in server.go:
--   ORDER BY (status = 'retry'), priority, run_after, id
-- This allows PostgreSQL to use an index scan instead of a full sort,
-- reducing query time from ~2400ms to ~1ms on large tables.
-- See: https://github.com/bitmagnet-io/bitmagnet/issues/390
CREATE INDEX queue_jobs_polling_idx ON queue_jobs (
    queue,
    (status = 'retry'),
    priority,
    run_after,
    id
) WHERE status IN ('pending', 'retry');

-- The old index with id as the leading column is not useful for any query pattern.
DROP INDEX IF EXISTS queue_jobs_id_queue_status_priority_run_after_idx;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

DROP INDEX IF EXISTS queue_jobs_polling_idx;

CREATE INDEX queue_jobs_id_queue_status_priority_run_after_idx
    ON queue_jobs (id, queue, status, priority, run_after);

-- +goose StatementEnd
