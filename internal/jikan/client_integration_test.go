//go:build integration

package jikan

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func newTestClient(t *testing.T) client {
	t.Helper()
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://api.jikan.moe/v4",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchAnime_Jikan(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchAnime(context.Background(), SearchAnimeRequest{
		Query: "Naruto",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0, "expected at least one result")

	anime := resp.Data[0]
	t.Logf("First result: %s / %s (mal_id=%d, year=%d)", anime.TitleEnglish, anime.Title, anime.MalID, anime.Year)
	assert.NotZero(t, anime.MalID)
	assert.NotEmpty(t, anime.Title)
}

func TestSearchAnime_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(time.Second)

	resp, err := c.SearchAnime(context.Background(), SearchAnimeRequest{
		Query: "Death Note",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0)

	content := AnimeResultToContentModel(resp.Data[0])

	assert.Equal(t, "myanimelist", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}

func TestSearchAnime_Mal(t *testing.T) {
	clientID := os.Getenv("JIKAN_MAL_CLIENT_ID")
	if clientID == "" {
		t.Skip("JIKAN_MAL_CLIENT_ID not set")
	}

	r, err := newRequester(Config{
		Enabled:        true,
		RateLimit:      time.Second,
		RateLimitBurst: 1,
		MalClientID:    clientID,
	}, zap.NewNop().Sugar())
	require.NoError(t, err)
	c := client{requester: r, mal: true}

	resp, err := c.SearchAnime(context.Background(), SearchAnimeRequest{Query: "Death Note", Limit: 5})
	require.NoError(t, err)
	require.NotEmpty(t, resp.Data)

	anime := resp.Data[0]
	t.Logf("First result: %s / %s (mal_id=%d, year=%d, type=%s)", anime.TitleEnglish, anime.Title, anime.MalID, anime.Year, anime.Type)
	assert.Equal(t, 1535, anime.MalID)
	assert.Equal(t, 2006, anime.Year)
	assert.Equal(t, "TV", anime.Type)
	assert.NotEmpty(t, anime.Images.JPG.LargeImageURL)
}
