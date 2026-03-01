//go:build integration

package llm

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
	baseURL := os.Getenv("LLM_BASE_URL")
	if baseURL == "" {
		t.Skip("LLM_BASE_URL not set, skipping integration test")
	}
	model := os.Getenv("LLM_MODEL")
	logger := zap.NewNop().Sugar()
	cfg := Config{
		Enabled:        true,
		BaseURL:        baseURL,
		Model:          model,
		Timeout:        60 * time.Second,
		MinConfidence:  0.7,
		RateLimit:      500 * time.Millisecond,
		RateLimitBurst: 2,
	}
	r, err := newRequester(cfg, logger)
	require.NoError(t, err)
	return client{requester: r, model: model}
}

func TestClassify_EnglishMovie(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "The.Shawshank.Redemption.1994.1080p.BluRay.x264",
	})
	require.NoError(t, err)

	assert.Equal(t, "movie", result.Type)
	assert.Contains(t, result.Title, "Shawshank")
	assert.Equal(t, 1994, result.Year)
	assert.GreaterOrEqual(t, result.Confidence, 0.8)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

func TestClassify_ChineseTVShow(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "一人之下 第一季 全24集 1080P",
		Files: []FileInfo{
			{Path: "一人之下/S01E01.mkv", Extension: "mkv", Size: 200000000},
			{Path: "一人之下/S01E02.mkv", Extension: "mkv", Size: 200000000},
		},
	})
	require.NoError(t, err)

	assert.Equal(t, "tv_show", result.Type)
	assert.NotEmpty(t, result.Title)
	assert.GreaterOrEqual(t, result.Confidence, 0.7)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

func TestClassify_RussianMovie(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "Опенгеймер.2023.D.BDRip.1080p",
	})
	require.NoError(t, err)

	assert.Equal(t, "movie", result.Type)
	assert.Contains(t, result.Title, "Oppenheimer")
	assert.Equal(t, 2023, result.Year)
	assert.GreaterOrEqual(t, result.Confidence, 0.8)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

func TestClassify_MusicAlbum(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "Radiohead - OK Computer (1997) [FLAC]",
		Files: []FileInfo{
			{Path: "01 Airbag.flac", Extension: "flac", Size: 50000000},
			{Path: "02 Paranoid Android.flac", Extension: "flac", Size: 60000000},
		},
	})
	require.NoError(t, err)

	assert.Equal(t, "music", result.Type)
	assert.GreaterOrEqual(t, result.Confidence, 0.8)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

func TestClassify_AmbiguousLowConfidence(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "BTF7___1080_2025",
	})
	require.NoError(t, err)

	// Ambiguous names should get low confidence
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
	// We don't assert exact confidence, just log it — the LLM may vary
}

func TestClassify_Ebook(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "Frank Herbert - Dune (1965) [epub]",
		Files: []FileInfo{
			{Path: "Frank Herbert - Dune.epub", Extension: "epub", Size: 2000000},
		},
	})
	require.NoError(t, err)

	assert.Equal(t, "ebook", result.Type)
	assert.GreaterOrEqual(t, result.Confidence, 0.8)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

func TestClassify_AdultContent(t *testing.T) {
	c := newTestClient(t)

	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "Tushy Raw V35 XXX 1080p WEB-DL",
	})
	require.NoError(t, err)

	assert.Equal(t, "xxx", result.Type)
	assert.GreaterOrEqual(t, result.Confidence, 0.8)
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}
