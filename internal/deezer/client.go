package deezer

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchAlbum(ctx context.Context, req SearchAlbumRequest) (SearchAlbumResponse, error) {
	queryParams := map[string]string{
		"q": req.Query,
	}

	if req.Limit > 0 {
		queryParams["limit"] = strconv.Itoa(req.Limit)
	}

	var response SearchAlbumResponse
	_, err := c.requester.Request(ctx, "/search/album", queryParams, &response)

	return response, err
}
