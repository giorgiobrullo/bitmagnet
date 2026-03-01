package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/anilist"
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) anilistSearchAnime(title string, contentType model.ContentType) (model.Content, error) {
	results, searchErr := c.anilistClient.SearchAnime(c.Context, anilist.SearchRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(results) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[anilist.MediaResult](
		title,
		results,
		func(item anilist.MediaResult) []string {
			var candidates []string
			if item.Title.English != "" {
				candidates = append(candidates, item.Title.English)
			}
			if item.Title.Romaji != "" {
				candidates = append(candidates, item.Title.Romaji)
			}
			if item.Title.Native != "" {
				candidates = append(candidates, item.Title.Native)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := anilist.MediaResultToContentModel(bestMatch, contentType)
	return content, nil
}

func (c executionContext) anilistSearchManga(title string, contentType model.ContentType) (model.Content, error) {
	results, searchErr := c.anilistClient.SearchManga(c.Context, anilist.SearchRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(results) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[anilist.MediaResult](
		title,
		results,
		func(item anilist.MediaResult) []string {
			var candidates []string
			if item.Title.English != "" {
				candidates = append(candidates, item.Title.English)
			}
			if item.Title.Romaji != "" {
				candidates = append(candidates, item.Title.Romaji)
			}
			if item.Title.Native != "" {
				candidates = append(candidates, item.Title.Native)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := anilist.MediaResultToContentModel(bestMatch, contentType)
	return content, nil
}
