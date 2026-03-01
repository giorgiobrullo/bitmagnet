package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachMusicbrainzContentBySearchName = "attach_musicbrainz_content_by_search"

type attachMusicbrainzContentBySearchAction struct{}

func (attachMusicbrainzContentBySearchAction) name() string {
	return attachMusicbrainzContentBySearchName
}

var attachMusicbrainzContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachMusicbrainzContentBySearchName,
	description: "Attempt to attach content from the MusicBrainz API with a search on the torrent name",
}

func (attachMusicbrainzContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachMusicbrainzContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.musicbrainzClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.musicbrainzSearchRelease(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("musicbrainz release not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("musicbrainz release",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachMusicbrainzContentBySearchAction) JSONSchema() JSONSchema {
	return attachMusicbrainzContentBySearchPayloadSpec.JSONSchema()
}
