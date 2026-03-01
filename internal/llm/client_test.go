package llm

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSelectFileSamples(t *testing.T) {
	t.Parallel()

	t.Run("empty files", func(t *testing.T) {
		result := selectFileSamples(nil)
		assert.Empty(t, result)
	})

	t.Run("fewer than 5 files returns all", func(t *testing.T) {
		files := []FileInfo{
			{Path: "a.mkv", Extension: "mkv", Size: 100},
			{Path: "b.mkv", Extension: "mkv", Size: 200},
		}
		result := selectFileSamples(files)
		assert.Len(t, result, 2)
	})

	t.Run("one per extension priority", func(t *testing.T) {
		files := []FileInfo{
			{Path: "movie.mkv", Extension: "mkv", Size: 1000},
			{Path: "subs.srt", Extension: "srt", Size: 10},
			{Path: "info.nfo", Extension: "nfo", Size: 5},
			{Path: "movie2.mkv", Extension: "mkv", Size: 900},
			{Path: "sample.mkv", Extension: "mkv", Size: 50},
			{Path: "cover.jpg", Extension: "jpg", Size: 100},
			{Path: "poster.jpg", Extension: "jpg", Size: 80},
			{Path: "readme.txt", Extension: "txt", Size: 3},
		}
		result := selectFileSamples(files)
		assert.Len(t, result, 5)

		// Should have at least one of each unique extension (up to 5)
		exts := make(map[string]bool)
		for _, f := range result {
			exts[f.Extension] = true
		}
		// We have 5 unique extensions (mkv, srt, nfo, jpg, txt) and 5 slots
		assert.Len(t, exts, 5)
	})

	t.Run("largest file per extension selected when exceeding limit", func(t *testing.T) {
		files := []FileInfo{
			{Path: "small1.mkv", Extension: "mkv", Size: 100},
			{Path: "big.mkv", Extension: "mkv", Size: 5000},
			{Path: "medium.mkv", Extension: "mkv", Size: 1000},
			{Path: "small2.mkv", Extension: "mkv", Size: 50},
			{Path: "small3.mkv", Extension: "mkv", Size: 25},
			{Path: "small4.mkv", Extension: "mkv", Size: 10},
		}
		result := selectFileSamples(files)
		assert.Len(t, result, 5)
		// First one should be the largest per extension (big.mkv for mkv)
		assert.Equal(t, "big.mkv", result[0].Path)
	})
}

func TestBuildUserMessage(t *testing.T) {
	t.Parallel()

	t.Run("name only no files", func(t *testing.T) {
		msg := buildUserMessage(ClassifyInput{
			Name: "Some Torrent",
		})
		assert.Equal(t, "Some Torrent", msg)
	})

	t.Run("name with files", func(t *testing.T) {
		msg := buildUserMessage(ClassifyInput{
			Name: "Some Torrent",
			Files: []FileInfo{
				{Path: "video.mkv", Extension: "mkv", Size: 1000},
			},
		})
		assert.Contains(t, msg, "Some Torrent")
		assert.Contains(t, msg, "Files:")
		assert.Contains(t, msg, "video.mkv")
	})

	t.Run("long paths truncated", func(t *testing.T) {
		longPath := ""
		for i := 0; i < 200; i++ {
			longPath += "a"
		}
		msg := buildUserMessage(ClassifyInput{
			Name: "Test",
			Files: []FileInfo{
				{Path: longPath, Extension: "mkv", Size: 1000},
			},
		})
		// Path should be truncated to 100 chars
		assert.Less(t, len(msg), len(longPath)+50)
	})
}

func TestStripCodeFences(t *testing.T) {
	t.Parallel()

	t.Run("plain json", func(t *testing.T) {
		assert.Equal(t, `{"type":"movie"}`, stripCodeFences(`{"type":"movie"}`))
	})

	t.Run("with code fences", func(t *testing.T) {
		assert.Equal(t, `{"type":"movie"}`, stripCodeFences("```json\n{\"type\":\"movie\"}\n```"))
	})

	t.Run("with code fences no language", func(t *testing.T) {
		assert.Equal(t, `{"type":"movie"}`, stripCodeFences("```\n{\"type\":\"movie\"}\n```"))
	})
}

func TestNormalizeContentType(t *testing.T) {
	t.Parallel()

	tests := []struct {
		input    string
		expected string
	}{
		{"movie", "movie"},
		{"tv_show", "tv_show"},
		{"tvshow", "tv_show"},
		{"tv", "tv_show"},
		{"anime", "tv_show"},
		{"adult", "xxx"},
		{"porn", "xxx"},
		{"book", "ebook"},
		{"epub", "epub"},       // not in normalize map, returned as lowercase
		{"MOVIE", "movie"},     // uppercased input lowered
		{"TV Show", "tv_show"}, // normalized via lowercase + map
		{"  xxx  ", "xxx"},     // trimmed
		{"comics", "comic"},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			result := normalizeContentType(tt.input)
			assert.Equal(t, tt.expected, result)
		})
	}
}
