package anilist

import (
	"fmt"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceAniList = "anilist"

func MediaResultToContentModel(media MediaResult, contentType model.ContentType) model.Content {
	// Prefer English title, fallback to Romaji, then Native.
	title := media.Title.English
	if title == "" {
		title = media.Title.Romaji
	}
	if title == "" {
		title = media.Title.Native
	}

	var releaseYear model.Year
	if media.SeasonYear > 0 {
		releaseYear = model.Year(media.SeasonYear)
	} else if media.StartDate.Year > 0 {
		releaseYear = model.Year(media.StartDate.Year)
	}

	var collections []model.ContentCollection
	for _, studio := range media.Studios.Nodes {
		if studio.Name != "" {
			collections = append(collections, model.ContentCollection{
				Type:   "studio",
				Source: SourceAniList,
				ID:     strings.ToLower(strings.ReplaceAll(studio.Name, " ", "-")),
				Name:   studio.Name,
			})
		}
	}

	attributes := []model.ContentAttribute{
		{
			Source: SourceAniList,
			Key:    "id",
			Value:  fmt.Sprintf("%d", media.ID),
		},
	}

	if media.CoverImage.Large != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceAniList,
			Key:    "cover_url",
			Value:  media.CoverImage.Large,
		})
	}

	if len(media.Genres) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceAniList,
			Key:    "genres",
			Value:  strings.Join(media.Genres, ", "),
		})
	}

	if media.Format != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceAniList,
			Key:    "format",
			Value:  media.Format,
		})
	}

	if media.Episodes > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceAniList,
			Key:    "episodes",
			Value:  fmt.Sprintf("%d", media.Episodes),
		})
	}

	// Include all title variants as attributes for matching.
	var titleVariants []string
	if media.Title.English != "" {
		titleVariants = append(titleVariants, media.Title.English)
	}
	if media.Title.Romaji != "" && media.Title.Romaji != media.Title.English {
		titleVariants = append(titleVariants, media.Title.Romaji)
	}
	if media.Title.Native != "" {
		titleVariants = append(titleVariants, media.Title.Native)
	}
	if len(titleVariants) > 1 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceAniList,
			Key:    "alt_titles",
			Value:  strings.Join(titleVariants, " | "),
		})
	}

	return model.Content{
		Type:        contentType,
		Source:      SourceAniList,
		ID:          fmt.Sprintf("%d", media.ID),
		Title:       title,
		ReleaseYear: releaseYear,
		Adult:       model.NewNullBool(media.IsAdult),
		Collections: collections,
		Attributes:  attributes,
	}
}
