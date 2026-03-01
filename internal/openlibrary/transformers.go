package openlibrary

import (
	"fmt"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceOpenLibrary = "openlibrary"

func DocResultToContentModel(doc DocResult, contentType model.ContentType) model.Content {
	// Extract the work ID from the key (e.g. "/works/OL893415W" -> "OL893415W")
	id := doc.Key
	if strings.HasPrefix(id, "/works/") {
		id = id[7:]
	}

	title := doc.Title
	if len(doc.AuthorName) > 0 {
		title = strings.Join(doc.AuthorName, ", ") + " - " + doc.Title
	}

	var releaseYear model.Year
	if doc.FirstPublishYear > 0 {
		releaseYear = model.Year(doc.FirstPublishYear)
	}

	var collections []model.ContentCollection
	if len(doc.Publisher) > 0 {
		collections = append(collections, model.ContentCollection{
			Type:   "publisher",
			Source: SourceOpenLibrary,
			ID:     strings.ToLower(strings.ReplaceAll(doc.Publisher[0], " ", "-")),
			Name:   doc.Publisher[0],
		})
	}

	attributes := []model.ContentAttribute{
		{
			Source: SourceOpenLibrary,
			Key:    "id",
			Value:  id,
		},
	}
	if len(doc.AuthorName) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceOpenLibrary,
			Key:    "author",
			Value:  strings.Join(doc.AuthorName, ", "),
		})
	}
	if doc.CoverI > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceOpenLibrary,
			Key:    "cover_url",
			Value:  fmt.Sprintf("https://covers.openlibrary.org/b/id/%d-L.jpg", doc.CoverI),
		})
	}
	if len(doc.ISBN) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceOpenLibrary,
			Key:    "isbn",
			Value:  doc.ISBN[0],
		})
	}
	if doc.NumberOfPages > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceOpenLibrary,
			Key:    "pages",
			Value:  fmt.Sprintf("%d", doc.NumberOfPages),
		})
	}
	if len(doc.Language) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceOpenLibrary,
			Key:    "language",
			Value:  strings.Join(doc.Language, ", "),
		})
	}

	return model.Content{
		Type:        contentType,
		Source:      SourceOpenLibrary,
		ID:         id,
		Title:       title,
		ReleaseYear: releaseYear,
		Collections: collections,
		Attributes:  attributes,
	}
}
