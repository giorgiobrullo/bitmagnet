package musicbrainz

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchRelease(ctx context.Context, req SearchReleaseRequest) (SearchReleaseResponse, error) {
	queryParams := map[string]string{
		"query": req.Query,
		"fmt":   "json",
	}

	if req.Limit > 0 {
		queryParams["limit"] = strconv.Itoa(req.Limit)
	}

	var response SearchReleaseResponse
	_, err := c.requester.Request(ctx, "/release", queryParams, &response)

	return response, err
}
