package jikan

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestAnimeResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with English title", func(t *testing.T) {
		anime := AnimeResult{
			MalID:         5114,
			Title:         "Fullmetal Alchemist: Brotherhood",
			TitleEnglish:  "Fullmetal Alchemist: Brotherhood",
			TitleJapanese: "\u92fc\u306e\u932c\u91d1\u8853\u5e2b FULLMETAL ALCHEMIST",
			Type:          "TV",
			Episodes:      64,
			Status:        "Finished Airing",
			Score:         9.11,
			Year:          2009,
			Images: AnimeImages{
				JPG: ImageURLs{
					LargeImageURL: "https://cdn.myanimelist.net/images/anime/1208/94745l.jpg",
				},
			},
			Studios: []NamedEntry{
				{MalID: 4, Name: "Bones"},
			},
			Genres: []NamedEntry{
				{MalID: 1, Name: "Action"},
				{MalID: 2, Name: "Adventure"},
			},
		}

		content := AnimeResultToContentModel(anime)

		assert.Equal(t, model.ContentTypeTvShow, content.Type)
		assert.Equal(t, "myanimelist", content.Source)
		assert.Equal(t, "5114", content.ID)
		assert.Equal(t, "Fullmetal Alchemist: Brotherhood", content.Title)
		assert.Equal(t, model.Year(2009), content.ReleaseYear)
		assert.Len(t, content.Collections, 1)
		assert.Equal(t, "Bones", content.Collections[0].Name)
	})

	t.Run("title fallback to main title", func(t *testing.T) {
		anime := AnimeResult{
			MalID: 100,
			Title: "Naruto",
			Year:  2002,
		}

		content := AnimeResultToContentModel(anime)

		assert.Equal(t, "Naruto", content.Title)
		assert.Equal(t, model.Year(2002), content.ReleaseYear)
	})

	t.Run("minimal result", func(t *testing.T) {
		anime := AnimeResult{
			MalID: 1,
			Title: "Cowboy Bebop",
		}

		content := AnimeResultToContentModel(anime)

		assert.Equal(t, model.ContentTypeTvShow, content.Type)
		assert.Equal(t, "1", content.ID)
		assert.Equal(t, "Cowboy Bebop", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})
}
