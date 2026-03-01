package porndb

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func intPtr(n int) *int { return &n }

func TestSceneResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with site and performers", func(t *testing.T) {
		scene := SceneResult{
			ID:       "abc-123",
			Title:    "Some Scene Title",
			Date:     "2023-05-10",
			Poster:   "https://example.com/poster.jpg",
			Background: &ImageSet{Full: "https://example.com/backdrop.jpg"},
			Duration: intPtr(1800),
			Site: &Site{
				ID:   5,
				Name: "Test Studio",
			},
			Performers: []Performer{
				{ID: "p1", Name: "Performer One"},
				{ID: "p2", Name: "Performer Two"},
			},
		}

		content := SceneResultToContentModel(scene)

		assert.Equal(t, model.ContentTypeXxx, content.Type)
		assert.Equal(t, "porndb", content.Source)
		assert.Equal(t, "abc-123", content.ID)
		assert.Equal(t, "Some Scene Title", content.Title)
		assert.Equal(t, model.Year(2023), content.ReleaseYear)
		assert.Equal(t, model.NewNullBool(true), content.Adult)
		assert.Equal(t, model.NullUint16{Uint16: 1800, Valid: true}, content.Runtime)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "studio", content.Collections[0].Type)
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
		assert.Equal(t, "Minimal Scene", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})

	t.Run("year derived from date", func(t *testing.T) {
		scene := SceneResult{
			ID:    "date-2",
			Title: "Scene With Date",
			Date:  "2021-12-25",
		}

		content := SceneResultToContentModel(scene)

		assert.Equal(t, model.Year(2021), content.ReleaseYear)
	})
}
