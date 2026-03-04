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

func TestClassify_AdultContent_ReturnsUnknown(t *testing.T) {
	c := newTestClient(t)

	// Adult content is detected by keyword matching before the LLM.
	// The LLM prompt excludes xxx — it should return "unknown" instead.
	result, err := c.Classify(context.Background(), ClassifyInput{
		Name: "Tushy Raw V35 XXX 1080p WEB-DL",
	})
	require.NoError(t, err)

	assert.NotEqual(t, "xxx", result.Type, "LLM should not return xxx (adult detection is handled separately)")
	t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
}

// Regression tests: content that was previously misclassified as xxx by the LLM.
func TestClassify_NotXxx_Anime(t *testing.T) {
	c := newTestClient(t)

	tests := []struct {
		name     string
		input    string
		wantType string
	}{
		{
			name:     "LoliHouse anime episode",
			input:    "[LoliHouse] Puniru wa Kawaii Slime - 24 [WebRip 1080p HEVC-10bit AAC SRTx2].mkv",
			wantType: "tv_show",
		},
		{
			name:     "SubsPlease anime episode",
			input:    "[SubsPlease] NEET Kunoichi to Nazeka Dousei Hajimemashita - 03 (1080p) [021F0F5E].mkv",
			wantType: "tv_show",
		},
		{
			name:     "Erai-raws anime episode",
			input:    "[Erai-raws] Niehime to Kemono no Ou - 24 [1080p][Multiple Subtitle][20BDBEA7].mkv",
			wantType: "tv_show",
		},
		{
			name:     "anime season pack",
			input:    "Magical Girl Raising Project S01 [Bluray-1080p Remux-h264]-LazyRemux",
			wantType: "tv_show",
		},
		{
			name:     "anime film",
			input:    "[Moe] DATE a Bullet (BD 1080p x264 FLAC)",
			wantType: "tv_show",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result, err := c.Classify(context.Background(), ClassifyInput{Name: tc.input})
			require.NoError(t, err)

			assert.Equal(t, tc.wantType, result.Type)
			assert.NotEqual(t, "xxx", result.Type, "anime should not be classified as xxx")
			t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
		})
	}
}

func TestClassify_NotXxx_MusicAndMovies(t *testing.T) {
	c := newTestClient(t)

	tests := []struct {
		name     string
		input    string
		wantType string
	}{
		{
			name:     "Steely Dan album",
			input:    "Steely Dan - Aja (Reissue) (2023) [24Bit-192kHz] FLAC [PMEDIA]",
			wantType: "music",
		},
		{
			name:     "Andre Bratten album",
			input:    "Andre Bratten - Math Ilium Ion [STS257D] FLAC-2015",
			wantType: "music",
		},
		{
			name:     "Pulp Fiction movie",
			input:    "Pulp Fiction (1994) (2160p BluRay x265 HEVC 10bit HDR AAC 5.1 Tigole)",
			wantType: "movie",
		},
		{
			name:     "Dogengers TV show",
			input:    "[MagicStar] Dogengers ~High School~ EP12 END [WEBDL] [1080p] [AMZN]",
			wantType: "tv_show",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result, err := c.Classify(context.Background(), ClassifyInput{Name: tc.input})
			require.NoError(t, err)

			assert.Equal(t, tc.wantType, result.Type)
			assert.NotEqual(t, "xxx", result.Type, "should not be classified as xxx")
			t.Logf("Result: type=%s title=%q year=%d confidence=%.2f", result.Type, result.Title, result.Year, result.Confidence)
		})
	}
}
