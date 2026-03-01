//go:build integration

package anilist

import (
	"context"
	"testing"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func newTestClient(t *testing.T) client {
	t.Helper()
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://graphql.anilist.co",
		RateLimit:      2 * time.Second,
		RateLimitBurst: 1,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchAnime_AniList(t *testing.T) {
	c := newTestClient(t)

	results, err := c.SearchAnime(context.Background(), SearchRequest{
		Query: "Attack on Titan",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(results), 0, "expected at least one result")

	anime := results[0]
	t.Logf("First result: %s / %s (id=%d, year=%d)", anime.Title.English, anime.Title.Romaji, anime.ID, anime.SeasonYear)
	assert.NotZero(t, anime.ID)
}

func TestSearchAnime_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(2 * time.Second)

	results, err := c.SearchAnime(context.Background(), SearchRequest{
		Query: "Cowboy Bebop",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(results), 0)

	content := MediaResultToContentModel(results[0], model.ContentTypeTvShow)

	assert.Equal(t, "anilist", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}

func TestSearchManga_AniList(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(2 * time.Second)

	results, err := c.SearchManga(context.Background(), SearchRequest{
		Query: "Berserk",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(results), 0, "expected at least one manga result")

	manga := results[0]
	t.Logf("First manga: %s / %s (id=%d)", manga.Title.English, manga.Title.Romaji, manga.ID)
	assert.NotZero(t, manga.ID)
}
