package igdb

import (
	"fmt"
	"strings"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceIGDB = "igdb"

func GameResultToContentModel(game GameResult) model.Content {
	var releaseYear model.Year
	if game.FirstReleaseDate != nil {
		t := time.Unix(*game.FirstReleaseDate, 0).UTC()
		releaseYear = model.Year(t.Year())
	}

	var collections []model.ContentCollection

	// Add developer/publisher as collections.
	for _, ic := range game.InvolvedCompanies {
		if ic.Developer && ic.Company.Name != "" {
			collections = append(collections, model.ContentCollection{
				Type:   "developer",
				Source: SourceIGDB,
				ID:     fmt.Sprintf("%d", ic.Company.ID),
				Name:   ic.Company.Name,
			})
		}
		if ic.Publisher && ic.Company.Name != "" {
			collections = append(collections, model.ContentCollection{
				Type:   "publisher",
				Source: SourceIGDB,
				ID:     fmt.Sprintf("%d", ic.Company.ID),
				Name:   ic.Company.Name,
			})
		}
	}

	var attributes []model.ContentAttribute
	attributes = append(attributes, model.ContentAttribute{
		Source: SourceIGDB,
		Key:    "id",
		Value:  fmt.Sprintf("%d", game.ID),
	})

	if game.Cover != nil && game.Cover.URL != "" {
		coverURL := game.Cover.URL
		// IGDB returns URLs without scheme prefix.
		if strings.HasPrefix(coverURL, "//") {
			coverURL = "https:" + coverURL
		}
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceIGDB,
			Key:    "cover_url",
			Value:  coverURL,
		})
	}

	if len(game.Genres) > 0 {
		var genreNames []string
		for _, g := range game.Genres {
			genreNames = append(genreNames, g.Name)
		}
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceIGDB,
			Key:    "genres",
			Value:  strings.Join(genreNames, ", "),
		})
	}

	if len(game.Platforms) > 0 {
		var platNames []string
		for _, p := range game.Platforms {
			platNames = append(platNames, p.Name)
		}
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceIGDB,
			Key:    "platforms",
			Value:  strings.Join(platNames, ", "),
		})
	}

	if game.Summary != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceIGDB,
			Key:    "summary",
			Value:  game.Summary,
		})
	}

	return model.Content{
		Type:        model.ContentTypeGame,
		Source:      SourceIGDB,
		ID:          fmt.Sprintf("%d", game.ID),
		Title:       game.Name,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
