package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/jikan"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) jikanSearchAnime(title string) (model.Content, error) {
	resp, searchErr := c.jikanClient.SearchAnime(c.Context, jikan.SearchAnimeRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(resp.Data) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[jikan.AnimeResult](
		title,
		resp.Data,
		func(item jikan.AnimeResult) []string {
			var candidates []string
			candidates = append(candidates, item.Title)
			if item.TitleEnglish != "" {
				candidates = append(candidates, item.TitleEnglish)
			}
			if item.TitleJapanese != "" {
				candidates = append(candidates, item.TitleJapanese)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := jikan.AnimeResultToContentModel(bestMatch)
	return content, nil
}
