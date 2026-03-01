package googlebooks

import (
	"fmt"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceGoogleBooks = "googlebooks"

func VolumeResultToContentModel(vol VolumeResult, contentType model.ContentType) model.Content {
	info := vol.VolumeInfo

	title := info.Title
	if len(info.Authors) > 0 {
		title = strings.Join(info.Authors, ", ") + " - " + info.Title
	}

	var releaseYear model.Year
	if info.PublishedDate != "" && len(info.PublishedDate) >= 4 {
		// PublishedDate can be "2023", "2023-05", or "2023-05-10".
		var y int
		if _, err := fmt.Sscanf(info.PublishedDate[:4], "%d", &y); err == nil && y > 0 && y < 3000 {
			releaseYear = model.Year(y)
		}
	}

	var collections []model.ContentCollection
	if info.Publisher != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "publisher",
			Source: SourceGoogleBooks,
			ID:     strings.ToLower(strings.ReplaceAll(info.Publisher, " ", "-")),
			Name:   info.Publisher,
		})
	}

	attributes := []model.ContentAttribute{
		{
			Source: SourceGoogleBooks,
			Key:    "id",
			Value:  vol.ID,
		},
	}

	if len(info.Authors) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceGoogleBooks,
			Key:    "author",
			Value:  strings.Join(info.Authors, ", "),
		})
	}

	if info.ImageLinks != nil && info.ImageLinks.Thumbnail != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceGoogleBooks,
			Key:    "cover_url",
			Value:  info.ImageLinks.Thumbnail,
		})
	}

	// Extract ISBN.
	for _, id := range info.IndustryIdentifiers {
		if id.Type == "ISBN_13" || id.Type == "ISBN_10" {
			attributes = append(attributes, model.ContentAttribute{
				Source: SourceGoogleBooks,
				Key:    "isbn",
				Value:  id.Identifier,
			})
			break
		}
	}

	if info.PageCount > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceGoogleBooks,
			Key:    "pages",
			Value:  fmt.Sprintf("%d", info.PageCount),
		})
	}

	if info.Language != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceGoogleBooks,
			Key:    "language",
			Value:  info.Language,
		})
	}

	if len(info.Categories) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceGoogleBooks,
			Key:    "categories",
			Value:  strings.Join(info.Categories, ", "),
		})
	}

	return model.Content{
		Type:        contentType,
		Source:      SourceGoogleBooks,
		ID:          vol.ID,
		Title:       title,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
