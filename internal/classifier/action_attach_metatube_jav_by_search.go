package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachMetatubeJAVBySearchName = "attach_metatube_jav_by_search"

type attachMetatubeJAVBySearchAction struct{}

func (attachMetatubeJAVBySearchAction) name() string {
	return attachMetatubeJAVBySearchName
}

var attachMetatubeJAVBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachMetatubeJAVBySearchName,
	description: "Attempt to attach content from MetaTube JAV sources (FANZA, JavBus, etc.) with a JAV code extracted from the torrent name",
}

func (attachMetatubeJAVBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachMetatubeJAVBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if ctx.metatubeClient == nil {
				return cl, classification.ErrUnmatched
			}

			code := ExtractJAVCode(ctx.torrent.Name)
			if code == "" {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.metatubeSearchJAV(code)
			if searchErr != nil {
				ctx.logger.Debugw("metatube JAV not found",
					"code", code)
				return cl, searchErr
			}

			ctx.logger.Infow("metatube JAV match",
				"code", code,
				"id", result.ID,
				"title", result.Title,
				"source", result.Source)

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachMetatubeJAVBySearchAction) JSONSchema() JSONSchema {
	return attachMetatubeJAVBySearchPayloadSpec.JSONSchema()
}
