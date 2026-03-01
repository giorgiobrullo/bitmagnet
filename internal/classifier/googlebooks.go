package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/googlebooks"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) googlebooksSearchVolumes(title string, contentType model.ContentType) (model.Content, error) {
	resp, searchErr := c.googlebooksClient.SearchVolumes(c.Context, googlebooks.SearchVolumesRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(resp.Items) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[googlebooks.VolumeResult](
		title,
		resp.Items,
		func(item googlebooks.VolumeResult) []string {
			candidates := []string{item.VolumeInfo.Title}
			// Also try "Author - Title" as a candidate.
			for _, author := range item.VolumeInfo.Authors {
				candidates = append(candidates, author+" - "+item.VolumeInfo.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := googlebooks.VolumeResultToContentModel(bestMatch, contentType)
	return content, nil
}
