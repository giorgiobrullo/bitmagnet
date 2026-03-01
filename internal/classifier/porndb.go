package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
)

func (c executionContext) porndbSearchScene(title string) (model.Content, error) {
	searchResult, searchErr := c.porndbClient.SearchScenes(c.Context, porndb.SearchScenesRequest{
		Query: title,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Data) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[porndb.SceneResult](
		title,
		searchResult.Data,
		func(item porndb.SceneResult) []string {
			return []string{item.Title}
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := porndb.SceneResultToContentModel(bestMatch)
	return content, nil
}
