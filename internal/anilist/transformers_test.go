package anilist

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestMediaResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("anime with English title", func(t *testing.T) {
		media := MediaResult{
			ID: 16498,
			Title: MediaTitle{
				Romaji:  "Shingeki no Kyojin",
				English: "Attack on Titan",
				Native:  "\u9032\u6483\u306e\u5de8\u4eba",
			},
			Format:     "TV",
			Episodes:   25,
			SeasonYear: 2013,
			Genres:     []string{"Action", "Drama", "Fantasy"},
			CoverImage: CoverImage{Large: "https://s4.anilist.co/file/anilist/cover.jpg"},
			Studios: Studios{
				Nodes: []Studio{{Name: "Wit Studio"}},
			},
			IsAdult: false,
		}

		content := MediaResultToContentModel(media, model.ContentTypeTvShow)

		assert.Equal(t, model.ContentTypeTvShow, content.Type)
		assert.Equal(t, "anilist", content.Source)
		assert.Equal(t, "16498", content.ID)
		assert.Equal(t, "Attack on Titan", content.Title)
		assert.Equal(t, model.Year(2013), content.ReleaseYear)
		assert.Equal(t, model.NewNullBool(false), content.Adult)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "Wit Studio", content.Collections[0].Name)
	})

	t.Run("manga with romaji fallback", func(t *testing.T) {
		media := MediaResult{
			ID: 30002,
			Title: MediaTitle{
				Romaji: "Berserk",
				Native: "\u30d9\u30eb\u30bb\u30eb\u30af",
			},
			Format:   "MANGA",
			Chapters: 364,
			Volumes:  41,
			StartDate: FuzzyDate{Year: 1989, Month: 8, Day: 25},
			Genres:   []string{"Action", "Adventure", "Drama"},
		}

		content := MediaResultToContentModel(media, model.ContentTypeComic)

		assert.Equal(t, model.ContentTypeComic, content.Type)
		assert.Equal(t, "Berserk", content.Title)
		assert.Equal(t, model.Year(1989), content.ReleaseYear) // from StartDate since SeasonYear is 0
	})

	t.Run("minimal result", func(t *testing.T) {
		media := MediaResult{
			ID: 1,
			Title: MediaTitle{
				Romaji: "Test",
			},
		}

		content := MediaResultToContentModel(media, model.ContentTypeTvShow)

		assert.Equal(t, model.ContentTypeTvShow, content.Type)
		assert.Equal(t, "1", content.ID)
		assert.Equal(t, "Test", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
	})
}
