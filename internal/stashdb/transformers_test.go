package stashdb

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestSceneResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with studio and performers", func(t *testing.T) {
		scene := SceneResult{
			ID:          "abc-123",
			Title:       "Some StashDB Scene",
			ReleaseDate: "2022-03-15",
			Duration:    2400,
			Studio: &Studio{
				ID:   "studio-1",
				Name: "Test Studio",
			},
			Performers: []PerformerAppearance{
				{Performer: Performer{ID: "p1", Name: "Performer One"}},
			},
			Images: []Image{
				{URL: "https://example.com/image.jpg", Width: 800, Height: 600},
			},
		}

		content := SceneResultToContentModel(scene)

		assert.Equal(t, model.ContentTypeXxx, content.Type)
		assert.Equal(t, "stashdb", content.Source)
		assert.Equal(t, "abc-123", content.ID)
		assert.Equal(t, "Some StashDB Scene", content.Title)
		assert.Equal(t, model.Year(2022), content.ReleaseYear)
		assert.Equal(t, model.NewNullBool(true), content.Adult)
		assert.Equal(t, model.NullUint16{Uint16: 2400, Valid: true}, content.Runtime)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "Test Studio", content.Collections[0].Name)
	})

	t.Run("minimal result", func(t *testing.T) {
		scene := SceneResult{
			ID:    "min-1",
			Title: "Minimal Scene",
		}

		content := SceneResultToContentModel(scene)

		assert.Equal(t, model.ContentTypeXxx, content.Type)
		assert.Equal(t, "min-1", content.ID)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})
}
