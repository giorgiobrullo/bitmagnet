package openlibrary

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestDocResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with author", func(t *testing.T) {
		doc := DocResult{
			Key:              "/works/OL893415W",
			Title:            "Dune",
			AuthorName:       []string{"Frank Herbert"},
			FirstPublishYear: 1965,
			CoverI:           11481354,
			Publisher:        []string{"Ace Books"},
			ISBN:             []string{"978-0441172719"},
			NumberOfPages:    592,
			Language:         []string{"eng"},
		}

		content := DocResultToContentModel(doc, model.ContentTypeEbook)

		assert.Equal(t, model.ContentTypeEbook, content.Type)
		assert.Equal(t, "openlibrary", content.Source)
		assert.Equal(t, "OL893415W", content.ID)
		assert.Equal(t, "Frank Herbert - Dune", content.Title)
		assert.Equal(t, model.Year(1965), content.ReleaseYear)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "publisher", content.Collections[0].Type)
		assert.Equal(t, "Ace Books", content.Collections[0].Name)
	})

	t.Run("minimal result no author", func(t *testing.T) {
		doc := DocResult{
			Key:   "/works/OL123W",
			Title: "Unknown Book",
		}

		content := DocResultToContentModel(doc, model.ContentTypeAudiobook)

		assert.Equal(t, model.ContentTypeAudiobook, content.Type)
		assert.Equal(t, "openlibrary", content.Source)
		assert.Equal(t, "OL123W", content.ID)
		assert.Equal(t, "Unknown Book", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
	})

	t.Run("audiobook content type preserved", func(t *testing.T) {
		doc := DocResult{
			Key:              "/works/OL456W",
			Title:            "Project Hail Mary",
			AuthorName:       []string{"Andy Weir"},
			FirstPublishYear: 2021,
		}

		content := DocResultToContentModel(doc, model.ContentTypeAudiobook)

		assert.Equal(t, model.ContentTypeAudiobook, content.Type)
		assert.Equal(t, "Andy Weir - Project Hail Mary", content.Title)
	})
}
