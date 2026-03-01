//go:build integration

package stashdb

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
	apiKey := os.Getenv("STASHDB_API_KEY")
	if apiKey == "" {
		t.Skip("STASHDB_API_KEY not set, skipping integration test")
	}
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://stashdb.org/graphql",
		APIKey:         apiKey,
		RateLimit:      500 * time.Millisecond,
		RateLimitBurst: 2,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchScenes_StashDB(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchScenes(context.Background(), SearchScenesRequest{
		Term: "tushy",
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Scenes), 0, "expected at least one result")

	scene := resp.Scenes[0]
	t.Logf("First result: %s (id=%s, date=%s, studio=%v)", scene.Title, scene.ID, scene.ReleaseDate, scene.Studio)
	assert.NotEmpty(t, scene.ID)
	assert.NotEmpty(t, scene.Title)
}

func TestSearchScenes_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit
	time.Sleep(time.Second)

	resp, err := c.SearchScenes(context.Background(), SearchScenesRequest{
		Term: "vixen",
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Scenes), 0)

	scene := resp.Scenes[0]
	content := SceneResultToContentModel(scene)

	assert.Equal(t, "stashdb", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
