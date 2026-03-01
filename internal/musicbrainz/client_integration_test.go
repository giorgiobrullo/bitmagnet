//go:build integration

package musicbrainz

import (
	"context"
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
		BaseURL:        "https://musicbrainz.org/ws/2",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchRelease_OKComputer(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchRelease(context.Background(), SearchReleaseRequest{
		Query: "OK Computer Radiohead",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Releases), 0, "expected at least one result for 'OK Computer'")

	release := resp.Releases[0]
	t.Logf("First result: %s (id=%s, date=%s, artists=%v)", release.Title, release.ID, release.Date, release.ArtistCredit)
	assert.NotEmpty(t, release.ID)
	assert.NotEmpty(t, release.Title)
}

func TestSearchRelease_DarkSideOfTheMoon(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit from previous test
	time.Sleep(time.Second)

	resp, err := c.SearchRelease(context.Background(), SearchReleaseRequest{
		Query: "The Dark Side of the Moon Pink Floyd",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Releases), 0)
	t.Logf("First result: %s (artists=%v)", resp.Releases[0].Title, resp.Releases[0].ArtistCredit)
}

func TestSearchRelease_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	// Wait for rate limit from previous test
	time.Sleep(time.Second)

	resp, err := c.SearchRelease(context.Background(), SearchReleaseRequest{
		Query: "Abbey Road Beatles",
		Limit: 3,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Releases), 0)

	// Test the transformer with real data
	release := resp.Releases[0]
	content := ReleaseResultToContentModel(release)

	assert.Equal(t, "musicbrainz", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
