package metatube

import (
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceMetatube = "metatube"

func MovieResultToContentModel(movie MovieResult) model.Content {
	releaseDate := model.Date{}
	if movie.ReleaseDate != "" && movie.ReleaseDate != "0001-01-01" {
		parsedDate, err := model.NewDateFromIsoString(movie.ReleaseDate)
		if err == nil {
			releaseDate = parsedDate
		}
	}

	releaseYear := releaseDate.Year

	var collections []model.ContentCollection
	if movie.Maker != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "studio",
			Source: SourceMetatube,
			ID:     movie.Maker,
			Name:   movie.Maker,
		})
	}

	var attributes []model.ContentAttribute
	if movie.CoverURL != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMetatube,
			Key:    "poster_url",
			Value:  movie.CoverURL,
		})
	}
	if len(movie.Actors) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMetatube,
			Key:    "performers",
			Value:  strings.Join(movie.Actors, ", "),
		})
	}
	if movie.Label != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMetatube,
			Key:    "label",
			Value:  movie.Label,
		})
	}
	if movie.Series != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMetatube,
			Key:    "series",
			Value:  movie.Series,
		})
	}

	var runtime model.NullUint16
	if movie.Runtime > 0 {
		runtime = model.NullUint16{Uint16: uint16(movie.Runtime), Valid: true}
	}

	var voteAverage model.NullFloat32
	if movie.Score > 0 {
		voteAverage = model.NullFloat32{Float32: float32(movie.Score), Valid: true}
	}

	// Use provider:number as the content ID to track provenance.
	contentID := movie.Number
	if movie.Provider != "" {
		contentID = movie.Provider + ":" + movie.Number
	}

	return model.Content{
		Type:        model.ContentTypeXxx,
		Source:      SourceMetatube,
		ID:          contentID,
		Title:       movie.Title,
		ReleaseDate: releaseDate,
		ReleaseYear: releaseYear,
		Adult:       model.NewNullBool(true),
		Runtime:     runtime,
		VoteAverage: voteAverage,
		Collections: collections,
		Attributes:  attributes,
	}
}
