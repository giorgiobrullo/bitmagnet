package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/igdb"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) igdbSearchGames(title string) (model.Content, error) {
	results, searchErr := c.igdbClient.SearchGames(c.Context, igdb.SearchGamesRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(results) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[igdb.GameResult](
		title,
		results,
		func(item igdb.GameResult) []string {
			return []string{item.Name}
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := igdb.GameResultToContentModel(bestMatch)
	return content, nil
}
