package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachDiscogsContentBySearchName = "attach_discogs_content_by_search"

type attachDiscogsContentBySearchAction struct{}

func (attachDiscogsContentBySearchAction) name() string {
	return attachDiscogsContentBySearchName
}

var attachDiscogsContentBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachDiscogsContentBySearchName,
	description: "Attempt to attach content from the Discogs API with a search on the torrent name",
}

func (attachDiscogsContentBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachDiscogsContentBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if !cl.BaseTitle.Valid {
				ctx.logger.Info("invalid base title")
				return cl, classification.ErrUnmatched
			}
			if ctx.discogsClient == nil {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.discogsSearchRelease(cl.BaseTitle.String)
			if searchErr != nil {
				ctx.logger.Infow("discogs release not found",
					"base_title", cl.BaseTitle.String)
				return cl, searchErr
			}

			ctx.logger.Infow("discogs release",
				"base_title", cl.BaseTitle.String,
				"id", result.ID,
				"title", result.Title,
				"year", result.ReleaseYear.String())

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachDiscogsContentBySearchAction) JSONSchema() JSONSchema {
	return attachDiscogsContentBySearchPayloadSpec.JSONSchema()
}
