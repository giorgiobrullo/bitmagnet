package porndb

import "context"

type client struct {
	requester Requester
}

func (c client) SearchScenes(ctx context.Context, req SearchScenesRequest) (SearchScenesResponse, error) {
	queryParams := map[string]string{
		"q": req.Query,
	}

	var response SearchScenesResponse
	_, err := c.requester.Request(ctx, "/scenes", queryParams, &response)

	return response, err
}

func (c client) SearchJAV(ctx context.Context, req SearchJAVRequest) (SearchJAVResponse, error) {
	queryParams := map[string]string{
		"q": req.Query,
	}

	var response SearchJAVResponse
	_, err := c.requester.Request(ctx, "/jav", queryParams, &response)

	return response, err
}
