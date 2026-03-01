package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/openlibrary"
)

func (c executionContext) openlibrarySearchBooks(title string, contentType model.ContentType) (model.Content, error) {
	searchResult, searchErr := c.openlibraryClient.SearchBooks(c.Context, openlibrary.SearchBooksRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Docs) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[openlibrary.DocResult](
		title,
		searchResult.Docs,
		func(item openlibrary.DocResult) []string {
			candidates := []string{item.Title}
			// Also try "Author - Title" as a candidate.
			for _, author := range item.AuthorName {
				candidates = append(candidates, author+" - "+item.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := openlibrary.DocResultToContentModel(bestMatch, contentType)
	return content, nil
}
