package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachOpenlibraryContentBySearchName = "attach_openlibrary_content_by_search"

type attachOpenlibraryContentBySearchAction struct{}

func (attachOpenlibraryContentBySearchAction) name() string {
	return attachOpenlibraryContentBySearchName
}

var attachOpenlibraryContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachOpenlibraryContentBySearchName,
	description: "Attempt to attach content from the OpenLibrary API with a search on the torrent name",
}

func (attachOpenlibraryContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachOpenlibraryContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.openlibraryClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.openlibrarySearchBooks(cl.BaseTitle.String, cl.ContentType.ContentType)
			if searchErr != nil {
				ctx.logger.Infow("openlibrary book not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("openlibrary book",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachOpenlibraryContentBySearchAction) JSONSchema() JSONSchema {
	return attachOpenlibraryContentBySearchPayloadSpec.JSONSchema()
}
