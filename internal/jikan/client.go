package jikan

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchAnime(ctx context.Context, req SearchAnimeRequest) (SearchAnimeResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}

	queryParams := map[string]string{
		"q":     req.Query,
		"limit": strconv.Itoa(limit),
	}

	var response SearchAnimeResponse
	_, err := c.requester.Request(ctx, "/anime", queryParams, &response)
	return response, err
}
