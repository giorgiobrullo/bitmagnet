package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/deezer"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) deezerSearchAlbum(title string) (model.Content, error) {
	searchResult, searchErr := c.deezerClient.SearchAlbum(c.Context, deezer.SearchAlbumRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Data) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[deezer.AlbumResult](
		title,
		searchResult.Data,
		func(item deezer.AlbumResult) []string {
			candidates := []string{item.Title}
			if item.Artist.Name != "" {
				candidates = append(candidates, item.Artist.Name+" - "+item.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := deezer.AlbumResultToContentModel(bestMatch)
	return content, nil
}
