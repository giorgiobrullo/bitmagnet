package googlebooks

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchVolumes(ctx context.Context, req SearchVolumesRequest) (SearchVolumesResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}

	queryParams := map[string]string{
		"q":          req.Query,
		"maxResults": strconv.Itoa(limit),
	}

	var response SearchVolumesResponse
	_, err := c.requester.Request(ctx, "/volumes", queryParams, &response)
	return response, err
}
