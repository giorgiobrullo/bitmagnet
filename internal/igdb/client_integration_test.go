//go:build integration

package igdb

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
	clientID := os.Getenv("IGDB_CLIENT_ID")
	clientSecret := os.Getenv("IGDB_CLIENT_SECRET")
	if clientID == "" || clientSecret == "" {
		t.Skip("IGDB_CLIENT_ID/IGDB_CLIENT_SECRET not set, skipping integration test")
	}
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://api.igdb.com/v4",
		ClientID:       clientID,
		ClientSecret:   clientSecret,
		RateLimit:      250 * time.Millisecond,
		RateLimitBurst: 4,
	}
	lazy := &requesterLazy{config: cfg, logger: logger}
	return client{requester: lazy}
}

func TestSearchGames_IGDB(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchGames(context.Background(), SearchGamesRequest{
		Query: "The Witcher 3",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp), 0, "expected at least one result")

	game := resp[0]
	t.Logf("First result: %s (id=%d)", game.Name, game.ID)
	assert.NotEmpty(t, game.Name)
	assert.NotZero(t, game.ID)
}

func TestSearchGames_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(500 * time.Millisecond)

	resp, err := c.SearchGames(context.Background(), SearchGamesRequest{
		Query: "Elden Ring",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp), 0)

	game := resp[0]
	content := GameResultToContentModel(game)

	assert.Equal(t, "igdb", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
