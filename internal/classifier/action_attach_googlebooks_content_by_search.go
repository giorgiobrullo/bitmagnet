package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachGooglebooksContentBySearchName = "attach_googlebooks_content_by_search"

type attachGooglebooksContentBySearchAction struct{}

func (attachGooglebooksContentBySearchAction) name() string {
	return attachGooglebooksContentBySearchName
}

var attachGooglebooksContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachGooglebooksContentBySearchName,
	description: "Attempt to attach content from the Google Books API with a search on the torrent name",
}

func (attachGooglebooksContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachGooglebooksContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.googlebooksClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.googlebooksSearchVolumes(cl.BaseTitle.String, cl.ContentType.ContentType)
			if searchErr != nil {
				ctx.logger.Infow("googlebooks volume not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("googlebooks volume",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachGooglebooksContentBySearchAction) JSONSchema() JSONSchema {
	return attachGooglebooksContentBySearchPayloadSpec.JSONSchema()
}
