-- +goose Up
-- +goose StatementBegin
INSERT INTO metadata_sources (key, name, created_at, updated_at)
VALUES ('porndb', 'PornDB', now(), now()),
       ('stashdb', 'StashDB', now(), now()),
       ('musicbrainz', 'MusicBrainz', now(), now()),
       ('openlibrary', 'Open Library', now(), now()),
       ('comicvine', 'Comic Vine', now(), now()),
       ('igdb', 'IGDB', now(), now()),
       ('anilist', 'AniList', now(), now()),
       ('myanimelist', 'MyAnimeList', now(), now()),
       ('googlebooks', 'Google Books', now(), now())
ON CONFLICT (key) DO NOTHING;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM metadata_sources
WHERE key IN ('porndb', 'stashdb', 'musicbrainz', 'openlibrary', 'comicvine', 'igdb', 'anilist', 'myanimelist', 'googlebooks');
-- +goose StatementEnd
