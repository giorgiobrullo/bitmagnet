package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const attachAnilistContentBySearchName = "attach_anilist_content_by_search"

type attachAnilistContentBySearchAction struct{}

func (attachAnilistContentBySearchAction) name() string {
	return attachAnilistContentBySearchName
}

var attachAnilistContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachAnilistContentBySearchName,
	description: "Attempt to attach anime content from the AniList API with a search on the torrent name",
}

func (attachAnilistContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachAnilistContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.anilistClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.anilistSearchAnime(cl.BaseTitle.String, model.ContentTypeTvShow)
			if searchErr != nil {
				ctx.logger.Infow("anilist anime not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("anilist anime",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachAnilistContentBySearchAction) JSONSchema() JSONSchema {
	return attachAnilistContentBySearchPayloadSpec.JSONSchema()
}
