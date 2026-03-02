//go:build integration

package discogs

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
	token := os.Getenv("DISCOGS_TOKEN")
	if token == "" {
		t.Skip("DISCOGS_TOKEN not set, skipping integration test")
	}
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://api.discogs.com",
		Token:          token,
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchRelease_Discogs(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchRelease(context.Background(), SearchReleaseRequest{
		Query: "Nirvana Nevermind",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Results), 0, "expected at least one result")

	rel := resp.Results[0]
	t.Logf("First result: %s (id=%d, year=%s)", rel.Title, rel.ID, rel.Year)
	assert.NotEmpty(t, rel.Title)
	assert.NotZero(t, rel.ID)
}

func TestSearchRelease_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(time.Second)

	resp, err := c.SearchRelease(context.Background(), SearchReleaseRequest{
		Query: "Pink Floyd Dark Side of the Moon",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Results), 0)

	content := ReleaseResultToContentModel(resp.Results[0])

	assert.Equal(t, "discogs", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
