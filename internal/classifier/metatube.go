package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/metatube"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

func (c executionContext) metatubeSearchJAV(code string) (model.Content, error) {
	result, searchErr := c.metatubeClient.SearchJAV(c.Context, code)
	if searchErr != nil {
		return model.Content{}, classification.ErrUnmatched
	}

	content := metatube.MovieResultToContentModel(result)
	return content, nil
}
