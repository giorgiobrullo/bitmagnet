-- +goose Up

-- Fix double-dot file extension parsing: [^/.] excluded dots, so "file..srt" failed to extract "srt".
-- Change to [^/] which only excludes path separators.
alter table "torrent_files" drop column "extension";
alter table "torrent_files" add column "extension" text generated always as (substring(lower(path) from '[^/]\.([a-z0-9]+)$')) stored;

-- +goose Down

alter table "torrent_files" drop column "extension";
alter table "torrent_files" add column "extension" text generated always as (substring(lower(path) from '[^/.]\.([a-z0-9]+)$')) stored;
