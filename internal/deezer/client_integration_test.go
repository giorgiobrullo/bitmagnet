//go:build integration

package deezer

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
		BaseURL:        "https://api.deezer.com",
		RateLimit:      200 * time.Millisecond,
		RateLimitBurst: 5,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r}
}

func TestSearchAlbum_Deezer(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchAlbum(context.Background(), SearchAlbumRequest{
		Query: "Daft Punk Discovery",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0, "expected at least one result")

	album := resp.Data[0]
	t.Logf("First result: %s by %s (id=%d)", album.Title, album.Artist.Name, album.ID)
	assert.NotEmpty(t, album.Title)
	assert.NotZero(t, album.ID)
}

func TestSearchAlbum_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	time.Sleep(time.Second)

	resp, err := c.SearchAlbum(context.Background(), SearchAlbumRequest{
		Query: "Radiohead OK Computer",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Data), 0)

	content := AlbumResultToContentModel(resp.Data[0])

	assert.Equal(t, "deezer", content.Source)
	assert.NotEmpty(t, content.ID)
	assert.NotEmpty(t, content.Title)
	t.Logf("Content: type=%s source=%s id=%s title=%q", content.Type, content.Source, content.ID, content.Title)
}
