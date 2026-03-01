//go:build integration

package porndb

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
	apiKey := os.Getenv("PORNDB_API_KEY")
	if apiKey == "" {
		t.Skip("PORNDB_API_KEY not set, skipping integration test")
	}
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://api.theporndb.net",
		APIKey:         apiKey,
		RateLimit:      500 * time.Millisecond,
		RateLimitBurst: 2,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchScenes_PornDB(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchScenes(context.Background(), SearchScenesRequest{
		Query: "tushy",
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0, "expected at least one result")

	scene := resp.Data[0]
	t.Logf("First result: %s (id=%s, date=%s, site=%v)", scene.Title, scene.ID, scene.Date, scene.Site)
	assert.NotEmpty(t, scene.Title)
	assert.NotEmpty(t, scene.ID)
}

func TestSearchScenes_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit
	time.Sleep(time.Second)

	resp, err := c.SearchScenes(context.Background(), SearchScenesRequest{
		Query: "blacked",
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0)

	scene := resp.Data[0]
	content := SceneResultToContentModel(scene)

	assert.Equal(t, "porndb", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}

func TestSearchJAV_PornDB(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit
	time.Sleep(time.Second)

	resp, err := c.SearchJAV(context.Background(), SearchJAVRequest{
		Query: "SSIS",
	})
	require.NoError(t, err)
	// JAV search may or may not return results depending on data availability
	t.Logf("JAV results: %d", len(resp.Data))
	if len(resp.Data) > 0 {
		t.Logf("First JAV result: %s (id=%s)", resp.Data[0].Title, resp.Data[0].ID)
	}
}
