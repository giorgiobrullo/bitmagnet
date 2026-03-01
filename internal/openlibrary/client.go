package openlibrary

import (
	"context"
	"strconv"
)

type client struct {
	requester Requester
}

func (c client) SearchBooks(ctx context.Context, req SearchBooksRequest) (SearchBooksResponse, error) {
	queryParams := map[string]string{
		"q":      req.Query,
		"fields": "key,title,author_name,first_publish_year,cover_i,publisher,subject,language,edition_count,isbn,number_of_pages_median",
	}
	if req.Limit > 0 {
		queryParams["limit"] = strconv.Itoa(req.Limit)
	}

	var response SearchBooksResponse
	_, err := c.requester.Request(ctx, "/search.json", queryParams, &response)
	return response, err
}
