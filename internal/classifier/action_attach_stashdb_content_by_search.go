package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachStashdbContentBySearchName = "attach_stashdb_content_by_search"

type attachStashdbContentBySearchAction struct{}

func (attachStashdbContentBySearchAction) name() string {
	return attachStashdbContentBySearchName
}

var attachStashdbContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachStashdbContentBySearchName,
	description: "Attempt to attach content from the StashDB API with a search on the torrent name",
}

func (attachStashdbContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachStashdbContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.stashdbClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.stashdbSearchScene(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("stashdb scene not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("stashdb scene",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachStashdbContentBySearchAction) JSONSchema() JSONSchema {
	return attachStashdbContentBySearchPayloadSpec.JSONSchema()
}
