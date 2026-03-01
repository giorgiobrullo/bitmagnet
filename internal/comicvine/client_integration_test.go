//go:build integration

package comicvine

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
	apiKey := os.Getenv("COMICVINE_API_KEY")
	if apiKey == "" {
		t.Skip("COMICVINE_API_KEY not set, skipping integration test")
	}
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://comicvine.gamespot.com/api",
		APIKey:         apiKey,
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	logger := zap.NewNop().Sugar()
	return client{
		requester: &requesterLazy{config: cfg, logger: logger},
		apiKey:    apiKey,
	}
}

func TestSearchVolumes_Batman(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchVolumes(context.Background(), SearchVolumesRequest{
		Query: "Batman The Dark Knight Returns",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Results), 0, "expected at least one result for 'Batman'")

	vol := resp.Results[0]
	t.Logf("First result: %s (id=%d, year=%s, issues=%d)", vol.Name, vol.ID, vol.StartYear, vol.CountOfIssues)
	assert.NotEmpty(t, vol.Name)
	assert.Greater(t, vol.ID, 0)
}

func TestSearchVolumes_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit
	time.Sleep(time.Second)

	resp, err := c.SearchVolumes(context.Background(), SearchVolumesRequest{
		Query: "Saga Brian K Vaughan",
		Limit: 3,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Results), 0)

	vol := resp.Results[0]
	content := VolumeResultToContentModel(vol)

	assert.Equal(t, "comicvine", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
