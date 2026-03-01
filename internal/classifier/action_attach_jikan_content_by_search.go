package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachJikanContentBySearchName = "attach_jikan_content_by_search"

type attachJikanContentBySearchAction struct{}

func (attachJikanContentBySearchAction) name() string {
	return attachJikanContentBySearchName
}

var attachJikanContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachJikanContentBySearchName,
	description: "Attempt to attach anime content from the Jikan (MAL) API with a search on the torrent name",
}

func (attachJikanContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachJikanContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.jikanClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.jikanSearchAnime(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("jikan anime not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("jikan anime",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachJikanContentBySearchAction) JSONSchema() JSONSchema {
	return attachJikanContentBySearchPayloadSpec.JSONSchema()
}
