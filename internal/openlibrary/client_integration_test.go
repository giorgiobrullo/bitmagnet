//go:build integration

package openlibrary

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
	cfg := Config{
		Enabled:        true,
		BaseURL:        "https://openlibrary.org",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
	logger := zap.NewNop().Sugar()
	return client{requester: &requesterLazy{config: cfg, logger: logger}}
}

func TestSearchBooks_Dune(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchBooks(context.Background(), SearchBooksRequest{
		Query: "Dune Frank Herbert",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Docs), 0, "expected at least one result for 'Dune'")

	found := false
	for _, doc := range resp.Docs {
		if doc.Title == "Dune" {
			found = true
			assert.Greater(t, doc.FirstPublishYear, 0, "expected a publish year")
			assert.NotEmpty(t, doc.Key, "expected a work key")
			t.Logf("Found: %s (key=%s, year=%d, authors=%v)", doc.Title, doc.Key, doc.FirstPublishYear, doc.AuthorName)
			break
		}
	}
	assert.True(t, found, "expected to find 'Dune' in results")
}

func TestSearchBooks_Neuromancer(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchBooks(context.Background(), SearchBooksRequest{
		Query: "Neuromancer William Gibson",
		Limit: 5,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Docs), 0)
	t.Logf("First result: %s (authors=%v, year=%d)", resp.Docs[0].Title, resp.Docs[0].AuthorName, resp.Docs[0].FirstPublishYear)
}

func TestSearchBooks_TransformerOutput(t *testing.T) {
	c := newTestClient(t)

	resp, err := c.SearchBooks(context.Background(), SearchBooksRequest{
		Query: "1984 George Orwell",
		Limit: 3,
	})
	require.NoError(t, err)
	require.Greater(t, len(resp.Docs), 0)

	// Test the transformer with real data
	doc := resp.Docs[0]
	content := DocResultToContentModel(doc, "ebook")

	assert.Equal(t, "openlibrary", content.Source)
	assert.NotEmpty(t, content.ID, "expected a non-empty ID")
	assert.NotEmpty(t, content.Title, "expected a non-empty title")
	t.Logf("Content: type=%s source=%s id=%s title=%q year=%d", content.Type, content.Source, content.ID, content.Title, content.ReleaseYear)
}
