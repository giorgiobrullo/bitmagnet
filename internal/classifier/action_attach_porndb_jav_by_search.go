package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const attachPorndbJAVBySearchName = "attach_porndb_jav_by_search"

type attachPorndbJAVBySearchAction struct{}

func (attachPorndbJAVBySearchAction) name() string {
	return attachPorndbJAVBySearchName
}

var attachPorndbJAVBySearchPayloadSpec = payloadLiteral[string]{
	literal:     attachPorndbJAVBySearchName,
	description: "Attempt to attach content from ThePornDB JAV API with a JAV code extracted from the torrent name",
}

func (attachPorndbJAVBySearchAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := attachPorndbJAVBySearchPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if ctx.porndbClient == nil {
				return cl, classification.ErrUnmatched
			}

			// Extract JAV code from torrent name.
			code := ExtractJAVCode(ctx.torrent.Name)
			if code == "" {
				return cl, classification.ErrUnmatched
			}

			result, searchErr := ctx.porndbSearchJAV(code)
			if searchErr != nil {
				ctx.logger.Infow("porndb JAV not found",
					"code", code)
				return cl, searchErr
			}

			ctx.logger.Infow("porndb JAV match",
				"code", code,
				"id", result.ID,
				"title", result.Title)

			cl.AttachContent(&result)
			return cl, nil
		},
	}, nil
}

func (attachPorndbJAVBySearchAction) JSONSchema() JSONSchema {
	return attachPorndbJAVBySearchPayloadSpec.JSONSchema()
}
