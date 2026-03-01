package comicvine

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestVolumeResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with publisher", func(t *testing.T) {
		vol := VolumeResult{
			ID:            3101,
			Name:          "Batman: The Dark Knight Returns",
			StartYear:     "1986",
			CountOfIssues: 4,
			Deck:          "The Dark Knight Returns is a Batman comic book miniseries",
			Publisher: &Publisher{
				ID:   10,
				Name: "DC Comics",
			},
			Image: &Image{
				MediumURL: "https://comicvine.gamespot.com/a/uploads/scale_medium/image.jpg",
			},
		}

		content := VolumeResultToContentModel(vol)

		assert.Equal(t, model.ContentTypeComic, content.Type)
		assert.Equal(t, "comicvine", content.Source)
		assert.Equal(t, "3101", content.ID)
		assert.Equal(t, "Batman: The Dark Knight Returns (1986)", content.Title)
		assert.Equal(t, model.Year(1986), content.ReleaseYear)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "publisher", content.Collections[0].Type)
		assert.Equal(t, "DC Comics", content.Collections[0].Name)
		assert.Equal(t, "10", content.Collections[0].ID)
	})

	t.Run("minimal result no publisher", func(t *testing.T) {
		vol := VolumeResult{
			ID:   999,
			Name: "Some Comic",
		}

		content := VolumeResultToContentModel(vol)

		assert.Equal(t, model.ContentTypeComic, content.Type)
		assert.Equal(t, "comicvine", content.Source)
		assert.Equal(t, "999", content.ID)
		assert.Equal(t, "Some Comic", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})

	t.Run("start year included in title", func(t *testing.T) {
		vol := VolumeResult{
			ID:        42,
			Name:      "Saga",
			StartYear: "2012",
		}

		content := VolumeResultToContentModel(vol)

		assert.Equal(t, "Saga (2012)", content.Title)
		assert.Equal(t, model.Year(2012), content.ReleaseYear)
	})
}
