package discogs

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchRelease(ctx context.Context, req SearchReleaseRequest) (SearchReleaseResponse, error) {
	queryParams := map[string]string{
		"q":    req.Query,
		"type": "release",
	}

	if req.Limit > 0 {
		queryParams["per_page"] = strconv.Itoa(req.Limit)
	}

	var response SearchReleaseResponse
	_, err := c.requester.Request(ctx, "/database/search", queryParams, &response)

	return response, err
}
