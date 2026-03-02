package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
)

func (c executionContext) porndbSearchJAV(code string) (model.Content, error) {
	searchResult, searchErr := c.porndbClient.SearchJAV(c.Context, porndb.SearchJAVRequest{
		Query: code,
	})
	if searchErr != nil {
		return model.Content{}, searchErr
	}

	if len(searchResult.Data) == 0 {
		return model.Content{}, classification.ErrUnmatched
	}

	// JAV codes are unique identifiers — first result is the correct match.
	content := porndb.SceneResultToContentModel(searchResult.Data[0])
	return content, nil
}
