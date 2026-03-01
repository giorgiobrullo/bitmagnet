package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/musicbrainz"
)

func (c executionContext) musicbrainzSearchRelease(title string) (model.Content, error) {
	searchResult, searchErr := c.musicbrainzClient.SearchRelease(c.Context, musicbrainz.SearchReleaseRequest{
		Query: title,
		Limit: 10,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Releases) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	bestMatch, ok := levenshteinFindBestMatch[musicbrainz.ReleaseResult](
		title,
		searchResult.Releases,
		func(item musicbrainz.ReleaseResult) []string {
			candidates := []string{item.Title}
			// Also try "Artist - Title" as a candidate.
			for _, ac := range item.ArtistCredit {
				candidates = append(candidates, ac.Name+" - "+item.Title)
			}
			return candidates
		},
	)

	if !ok {
		return model.Content{}, classification.ErrUnmatched
	}

	content := musicbrainz.ReleaseResultToContentModel(bestMatch)
	return content, nil
}
