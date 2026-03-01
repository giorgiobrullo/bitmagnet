//go:build integration

package googlebooks

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func newTestClient(t *testing.T) client {
	t.Helper()
	apiKey := os.Getenv("GOOGLE_BOOKS_API_KEY")
	if apiKey == "" {
		t.Skip("GOOGLE_BOOKS_API_KEY not set, skipping integration test")
	}
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://www.googleapis.com/books/v1",
		APIKey:         apiKey,
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchVolumes_GoogleBooks(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchVolumes(context.Background(), SearchVolumesRequest{
		Query: "Dune Frank Herbert",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Items), 0, "expected at least one result")

	vol := resp.Items[0]
	t.Logf("First result: %s by %v (id=%s)", vol.VolumeInfo.Title, vol.VolumeInfo.Authors, vol.ID)
	assert.NotEmpty(t, vol.VolumeInfo.Title)
	assert.NotEmpty(t, vol.ID)
}

func TestSearchVolumes_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(time.Second)

	resp, err := c.SearchVolumes(context.Background(), SearchVolumesRequest{
		Query: "Neuromancer William Gibson",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Items), 0)

	content := VolumeResultToContentModel(resp.Items[0], model.ContentTypeEbook)

	assert.Equal(t, "googlebooks", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
