package igdb

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func int64Ptr(n int64) *int64 { return &n }

func TestGameResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with cover and companies", func(t *testing.T) {
		game := GameResult{
			ID:               1942,
			Name:             "The Witcher 3: Wild Hunt",
			Summary:          "An open-world RPG",
			FirstReleaseDate: int64Ptr(1431993600), // 2015-05-19
			Cover: &Cover{
				ID:  12345,
				URL: "//images.igdb.com/igdb/image/upload/t_cover_big/co1234.jpg",
			},
			Genres: []Genre{
				{ID: 12, Name: "Role-playing (RPG)"},
				{ID: 31, Name: "Adventure"},
			},
			Platforms: []Platform{
				{ID: 6, Name: "PC (Microsoft Windows)"},
				{ID: 48, Name: "PlayStation 4"},
			},
			InvolvedCompanies: []InvolvedCompany{
				{ID: 1, Company: Company{ID: 908, Name: "CD Projekt Red"}, Developer: true},
				{ID: 2, Company: Company{ID: 909, Name: "CD Projekt"}, Publisher: true},
			},
		}

		content := GameResultToContentModel(game)

		assert.Equal(t, model.ContentTypeGame, content.Type)
		assert.Equal(t, "igdb", content.Source)
		assert.Equal(t, "1942", content.ID)
		assert.Equal(t, "The Witcher 3: Wild Hunt", content.Title)
		assert.Equal(t, model.Year(2015), content.ReleaseYear)
		assert.Len(t, content.Collections, 2) // developer + publisher
		assert.Equal(t, "developer", content.Collections[0].Type)
		assert.Equal(t, "CD Projekt Red", content.Collections[0].Name)
		assert.Equal(t, "publisher", content.Collections[1].Type)
	})

	t.Run("cover URL gets https prefix", func(t *testing.T) {
		game := GameResult{
			ID:   100,
			Name: "Test Game",
			Cover: &Cover{
				URL: "//images.igdb.com/igdb/image/upload/t_cover_big/co1234.jpg",
			},
		}

		content := GameResultToContentModel(game)

		var coverURL string
		for _, a := range content.Attributes {
			if a.Key == "cover_url" {
				coverURL = a.Value
			}
		}
		assert.Equal(t, "https://images.igdb.com/igdb/image/upload/t_cover_big/co1234.jpg", coverURL)
	})

	t.Run("minimal result", func(t *testing.T) {
		game := GameResult{
			ID:   999,
			Name: "Minimal Game",
		}

		content := GameResultToContentModel(game)

		assert.Equal(t, model.ContentTypeGame, content.Type)
		assert.Equal(t, "999", content.ID)
		assert.Equal(t, "Minimal Game", content.Title)
		assert.Equal(t, model.Year(0), content.ReleaseYear)
		assert.Empty(t, content.Collections)
	})
}
