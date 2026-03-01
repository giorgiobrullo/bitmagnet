package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachComicvineContentBySearchName = "attach_comicvine_content_by_search"

type attachComicvineContentBySearchAction struct{}

func (attachComicvineContentBySearchAction) name() string {
	return attachComicvineContentBySearchName
}

var attachComicvineContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachComicvineContentBySearchName,
	description: "Attempt to attach content from the Comic Vine API with a search on the torrent name",
}

func (attachComicvineContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachComicvineContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.comicvineClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.comicvineSearchVolumes(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("comicvine volume not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("comicvine volume",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachComicvineContentBySearchAction) JSONSchema() JSONSchema {
	return attachComicvineContentBySearchPayloadSpec.JSONSchema()
}
