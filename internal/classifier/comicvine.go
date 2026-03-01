package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/comicvine"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) comicvineSearchVolumes(title string) (model.Content, error) {
	searchResult, searchErr := c.comicvineClient.SearchVolumes(c.Context, comicvine.SearchVolumesRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Results) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[comicvine.VolumeResult](
		title,
		searchResult.Results,
		func(item comicvine.VolumeResult) []string {
			candidates := []string{item.Name}
			if item.Publisher != nil && item.Publisher.Name != "" {
				candidates = append(candidates, item.Publisher.Name+" - "+item.Name)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := comicvine.VolumeResultToContentModel(bestMatch)
	return content, nil
}
