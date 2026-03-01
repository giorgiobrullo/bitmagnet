package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/stashdb"
)

func (c executionContext) stashdbSearchScene(title string) (model.Content, error) {
	searchResult, searchErr := c.stashdbClient.SearchScenes(c.Context, stashdb.SearchScenesRequest{
		Term: title,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Scenes) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[stashdb.SceneResult](
		title,
		searchResult.Scenes,
		func(item stashdb.SceneResult) []string {
			return []string{item.Title}
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := stashdb.SceneResultToContentModel(bestMatch)
	return content, nil
}
