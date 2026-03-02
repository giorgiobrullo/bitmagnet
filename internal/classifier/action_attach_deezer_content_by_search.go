package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachDeezerContentBySearchName = "attach_deezer_content_by_search"

type attachDeezerContentBySearchAction struct{}

func (attachDeezerContentBySearchAction) name() string {
	return attachDeezerContentBySearchName
}

var attachDeezerContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachDeezerContentBySearchName,
	description: "Attempt to attach content from the Deezer API with a search on the torrent name",
}

func (attachDeezerContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachDeezerContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.deezerClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.deezerSearchAlbum(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("deezer album not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("deezer album",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title)

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachDeezerContentBySearchAction) JSONSchema() JSONSchema {
	return attachDeezerContentBySearchPayloadSpec.JSONSchema()
}
