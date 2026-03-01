package jikan

import (
	"fmt"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceMyAnimeList = "myanimelist"

func AnimeResultToContentModel(anime AnimeResult) model.Content {
	// Prefer English title, fallback to main title.
	title := anime.TitleEnglish
	if title == "" {
		title = anime.Title
	}

	var releaseYear model.Year
	if anime.Year > 0 {
		releaseYear = model.Year(anime.Year)
	}

	var collections []model.ContentCollection
	for _, studio := range anime.Studios {
		if studio.Name != "" {
			collections = append(collections, model.ContentCollection{
				Type:   "studio",
				Source: SourceMyAnimeList,
				ID:     fmt.Sprintf("%d", studio.MalID),
				Name:   studio.Name,
			})
		}
	}

	attributes := []model.ContentAttribute{
		{
			Source: SourceMyAnimeList,
			Key:    "mal_id",
			Value:  fmt.Sprintf("%d", anime.MalID),
		},
	}

	if anime.Images.JPG.LargeImageURL != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "cover_url",
			Value:  anime.Images.JPG.LargeImageURL,
		})
	}

	if len(anime.Genres) > 0 {
		var genreNames []string
		for _, g := range anime.Genres {
			genreNames = append(genreNames, g.Name)
		}
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "genres",
			Value:  strings.Join(genreNames, ", "),
		})
	}

	if anime.Type != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "type",
			Value:  anime.Type,
		})
	}

	if anime.Episodes > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "episodes",
			Value:  fmt.Sprintf("%d", anime.Episodes),
		})
	}

	// Include title variants for matching.
	if anime.TitleEnglish != "" && anime.Title != anime.TitleEnglish {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "alt_title",
			Value:  anime.Title,
		})
	}
	if anime.TitleJapanese != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMyAnimeList,
			Key:    "title_japanese",
			Value:  anime.TitleJapanese,
		})
	}

	return model.Content{
		Type:        model.ContentTypeTvShow,
		Source:      SourceMyAnimeList,
		ID:          fmt.Sprintf("%d", anime.MalID),
		Title:       title,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
