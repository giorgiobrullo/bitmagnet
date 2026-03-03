package classifier

import (
	"strings"

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
			candidates := []string{item.Title}
			if item.Site != nil && item.Site.Name != "" {
				candidates = append(candidates, item.Site.Name+" "+item.Title)
			}
			var performerNames []string
			for _, p := range item.Performers {
				performerNames = append(performerNames, p.Name)
				candidates = append(candidates, p.Name+" "+item.Title)
				if item.Site != nil && item.Site.Name != "" {
					candidates = append(candidates, item.Site.Name+" "+p.Name)
				}
			}
			// Site + all performers: matches "Studio Performer1 Performer2" queries
			// where the torrent name has no scene title after the performers.
			if item.Site != nil && item.Site.Name != "" && len(performerNames) > 0 {
				allPerfs := strings.Join(performerNames, " ")
				candidates = append(candidates, item.Site.Name+" "+allPerfs)
				candidates = append(candidates, item.Site.Name+" "+allPerfs+" "+item.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := porndb.SceneResultToContentModel(bestMatch)
	return content, nil
}
