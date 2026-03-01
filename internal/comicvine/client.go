package comicvine

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
	apiKey    string
}

func (c client) SearchVolumes(ctx context.Context, req SearchVolumesRequest) (SearchVolumesResponse, error) {
	queryParams := map[string]string{
		"api_key":   c.apiKey,
		"query":     req.Query,
		"resources": "volume",
		"format":    "json",
	}
	if req.Limit > 0 {
		queryParams["limit"] = strconv.Itoa(req.Limit)
	}

	var response SearchVolumesResponse
	_, err := c.requester.Request(ctx, "/search/", queryParams, &response)
	return response, err
}
