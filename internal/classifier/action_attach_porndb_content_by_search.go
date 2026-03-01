package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachPorndbContentBySearchName = "attach_porndb_content_by_search"

type attachPorndbContentBySearchAction struct{}

func (attachPorndbContentBySearchAction) name() string {
	return attachPorndbContentBySearchName
}

var attachPorndbContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachPorndbContentBySearchName,
	description: "Attempt to attach content from ThePornDB API with a search on the torrent name",
}

func (attachPorndbContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachPorndbContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.porndbClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.porndbSearchScene(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("porndb scene not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("porndb scene",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachPorndbContentBySearchAction) JSONSchema() JSONSchema {
	return attachPorndbContentBySearchPayloadSpec.JSONSchema()
}
