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
			candidates := []string{item.Title}
			if item.Studio != nil && item.Studio.Name != "" {
				candidates = append(candidates, item.Studio.Name+" "+item.Title)
			}
			for _, p := range item.Performers {
				candidates = append(candidates, p.Performer.Name+" "+item.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := stashdb.SceneResultToContentModel(bestMatch)
	return content, nil
}
