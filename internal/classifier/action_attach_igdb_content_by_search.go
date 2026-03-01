package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachIgdbContentBySearchName = "attach_igdb_content_by_search"

type attachIgdbContentBySearchAction struct{}

func (attachIgdbContentBySearchAction) name() string {
	return attachIgdbContentBySearchName
}

var attachIgdbContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachIgdbContentBySearchName,
	description: "Attempt to attach content from the IGDB API with a search on the torrent name",
}

func (attachIgdbContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachIgdbContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.igdbClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.igdbSearchGames(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("igdb game not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("igdb game",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachIgdbContentBySearchAction) JSONSchema() JSONSchema {
	return attachIgdbContentBySearchPayloadSpec.JSONSchema()
}
