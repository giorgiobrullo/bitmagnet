package discogs

import (
	"strconv"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceDiscogs = "discogs"

func ReleaseResultToContentModel(release ReleaseResult) model.Content {
	releaseYear := model.Year(0)
	if release.Year != "" {
		if y, err := strconv.Atoi(release.Year); err == nil {
			releaseYear = model.Year(y)
		}
	}

	var collections []model.ContentCollection
	for _, g := range release.Genre {
		collections = append(collections, model.ContentCollection{
			Type:   "genre",
			Source: SourceDiscogs,
			ID:     strings.ToLower(strings.ReplaceAll(g, " ", "-")),
			Name:   g,
		})
	}
	for _, s := range release.Style {
		collections = append(collections, model.ContentCollection{
			Type:   "style",
			Source: SourceDiscogs,
			ID:     strings.ToLower(strings.ReplaceAll(s, " ", "-")),
			Name:   s,
		})
	}
	for _, l := range release.Label {
		collections = append(collections, model.ContentCollection{
			Type:   "label",
			Source: SourceDiscogs,
			ID:     strings.ToLower(strings.ReplaceAll(l, " ", "-")),
			Name:   l,
		})
	}

	var attributes []model.ContentAttribute
	attributes = append(attributes, model.ContentAttribute{
		Source: SourceDiscogs,
		Key:    "id",
		Value:  strconv.Itoa(release.ID),
	})
	if release.Country != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceDiscogs,
			Key:    "country",
			Value:  release.Country,
		})
	}
	if len(release.Format) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceDiscogs,
			Key:    "format",
			Value:  strings.Join(release.Format, ", "),
		})
	}

	return model.Content{
		Type:        model.ContentTypeMusic,
		Source:      SourceDiscogs,
		ID:          strconv.Itoa(release.ID),
		Title:       release.Title,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
