package googlebooks

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestVolumeResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with authors and ISBN", func(t *testing.T) {
		vol := VolumeResult{
			ID: "abc123",
			VolumeInfo: VolumeInfo{
				Title:         "Dune",
				Authors:       []string{"Frank Herbert"},
				Publisher:     "Ace Books",
				PublishedDate: "1965-08-01",
				PageCount:     412,
				Categories:    []string{"Fiction"},
				Language:      "en",
				ImageLinks: &ImageLinks{
					Thumbnail: "https://books.google.com/books/content?id=abc123&printsec=frontcover&img=1",
				},
				IndustryIdentifiers: []IndustryIdentifier{
					{Type: "ISBN_13", Identifier: "9780441172719"},
				},
			},
		}

		content := VolumeResultToContentModel(vol, model.ContentTypeEbook)

		assert.Equal(t, model.ContentTypeEbook, content.Type)
		assert.Equal(t, "googlebooks", content.Source)
		assert.Equal(t, "abc123", content.ID)
		assert.Equal(t, "Frank Herbert - Dune", content.Title)
		assert.Equal(t, model.Year(1965), content.ReleaseYear)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "publisher", content.Collections[0].Type)
		assert.Equal(t, "Ace Books", content.Collections[0].Name)
	})

	t.Run("year-only published date", func(t *testing.T) {
		vol := VolumeResult{
			ID: "xyz",
			VolumeInfo: VolumeInfo{
				Title:         "Test Book",
				PublishedDate: "2020",
			},
		}

		content := VolumeResultToContentModel(vol, model.ContentTypeEbook)

		assert.Equal(t, model.Year(2020), content.ReleaseYear)
	})

	t.Run("audiobook content type", func(t *testing.T) {
		vol := VolumeResult{
			ID: "audio1",
			VolumeInfo: VolumeInfo{
				Title: "An Audiobook",
			},
		}

		content := VolumeResultToContentModel(vol, model.ContentTypeAudiobook)

		assert.Equal(t, model.ContentTypeAudiobook, content.Type)
		assert.Equal(t, "An Audiobook", content.Title)
	})

	t.Run("minimal result", func(t *testing.T) {
		vol := VolumeResult{
			ID: "min1",
			VolumeInfo: VolumeInfo{
				Title: "Minimal Book",
			},
		}

		content := VolumeResultToContentModel(vol, model.ContentTypeEbook)

		assert.Equal(t, model.ContentTypeEbook, content.Type)
		assert.Equal(t, "min1", content.ID)
		assert.Equal(t, "Minimal Book", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})
}
