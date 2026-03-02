package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/discogs"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) discogsSearchRelease(title string) (model.Content, error) {
	searchResult, searchErr := c.discogsClient.SearchRelease(c.Context, discogs.SearchReleaseRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Results) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[discogs.ReleaseResult](
		title,
		searchResult.Results,
		func(item discogs.ReleaseResult) []string {
			// Discogs title is already "Artist - Album" format.
			return []string{item.Title}
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := discogs.ReleaseResultToContentModel(bestMatch)
	return content, nil
}
