package comicvine

import (
	"fmt"
	"strconv"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceComicVine = "comicvine"

func VolumeResultToContentModel(vol VolumeResult) model.Content {
	id := strconv.Itoa(vol.ID)

	title := vol.Name
	if vol.StartYear != "" {
		title = fmt.Sprintf("%s (%s)", vol.Name, vol.StartYear)
	}

	var releaseYear model.Year
	if vol.StartYear != "" {
		if y, err := strconv.Atoi(vol.StartYear); err == nil && y > 0 {
			releaseYear = model.Year(y)
		}
	}

	var collections []model.ContentCollection
	if vol.Publisher != nil && vol.Publisher.Name != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "publisher",
			Source: SourceComicVine,
			ID:     strconv.Itoa(vol.Publisher.ID),
			Name:   vol.Publisher.Name,
		})
	}

	attributes := []model.ContentAttribute{
		{
			Source: SourceComicVine,
			Key:    "id",
			Value:  id,
		},
	}
	if vol.CountOfIssues > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceComicVine,
			Key:    "issue_count",
			Value:  strconv.Itoa(vol.CountOfIssues),
		})
	}
	if vol.Image != nil && vol.Image.MediumURL != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceComicVine,
			Key:    "cover_url",
			Value:  vol.Image.MediumURL,
		})
	}
	if vol.Deck != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceComicVine,
			Key:    "description",
			Value:  vol.Deck,
		})
	}

	return model.Content{
		Type:        model.ContentTypeComic,
		Source:      SourceComicVine,
		ID:         id,
		Title:       title,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
