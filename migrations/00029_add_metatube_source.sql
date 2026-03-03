-- +goose Up
-- +goose StatementBegin
INSERT INTO metadata_sources (key, name, created_at, updated_at)
VALUES ('metatube', 'MetaTube', now(), now())
ON CONFLICT (key) DO NOTHING;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM metadata_sources WHERE key = 'metatube';
-- +goose StatementEnd
