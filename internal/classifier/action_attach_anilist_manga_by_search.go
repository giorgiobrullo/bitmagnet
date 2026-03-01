package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const attachAnilistMangaBySearchName = "attach_anilist_manga_by_search"

type attachAnilistMangaBySearchAction struct{}

func (attachAnilistMangaBySearchAction) name() string {
	return attachAnilistMangaBySearchName
}

var attachAnilistMangaBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachAnilistMangaBySearchName,
	description: "Attempt to attach manga content from the AniList API with a search on the torrent name",
}

func (attachAnilistMangaBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachAnilistMangaBySearchPayloadSpec.Unmarshal(ctx); err != nil {
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

			result, searchErr := ctx.anilistSearchManga(cl.BaseTitle.String, model.ContentTypeComic)
			if searchErr != nil {
				ctx.logger.Infow("anilist manga not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("anilist manga",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachAnilistMangaBySearchAction) JSONSchema() JSONSchema {
	return attachAnilistMangaBySearchPayloadSpec.JSONSchema()
}
