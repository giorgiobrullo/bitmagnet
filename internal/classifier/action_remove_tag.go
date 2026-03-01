package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
)

const removeTagName = "remove_tag"

type removeTagAction struct{}

func (removeTagAction) name() string {
	return removeTagName
}

var removeTagPayloadSpec = payloadSingleKeyValue[[]string]{
	key: removeTagName,
	valueSpec: payloadMustSucceed[[]string]{
		payloadList[string]{
			itemSpec: tagPayloadSpec,
		},
	},
	description: "Remove one or more tags from the current torrent",
}

func (removeTagAction) compileAction(ctx compilerContext) (action, error) {
	tags, err := removeTagPayloadSpec.Unmarshal(ctx)
	if err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if cl.Tags == nil {
				cl.Tags = classification.NewTagAction()
			}
			for _, tag := range tags {
				cl.Tags.Delete[tag] = struct{}{}
			}
			return cl, nil
		},
	}, nil
}

func (removeTagAction) JSONSchema() JSONSchema {
	return removeTagPayloadSpec.JSONSchema()
}
