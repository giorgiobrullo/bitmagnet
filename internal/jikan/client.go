package jikan

import (
	"context"
	"strconv"
	"strings"
)

type client struct {
	requester Requester
	mal       bool
}

func (c client) SearchAnime(ctx context.Context, req SearchAnimeRequest) (SearchAnimeResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}

	if c.mal {
		return c.searchAnimeMal(ctx, req.Query, limit)
	}

	queryParams := map[string]string{
		"q":     req.Query,
		"limit": strconv.Itoa(limit),
	}

	var response SearchAnimeResponse
	_, err := c.requester.Request(ctx, "/anime", queryParams, &response)
	return response, err
}

const (
	malQueryMinLength = 3
	malQueryMaxLength = 64
	malFields         = "alternative_titles,start_date,num_episodes,media_type,genres,studios,main_picture"
)

// MAL rejects queries outside 3-64 characters with a 400; a shorter query can't match and
// a longer one is cut back to its last whole word within the limit.
func malQuery(query string) (string, bool) {
	runes := []rune(strings.TrimSpace(query))
	if len(runes) < malQueryMinLength {
		return "", false
	}

	if len(runes) > malQueryMaxLength {
		cut := string(runes[:malQueryMaxLength])
		if i := strings.LastIndex(cut, " "); i >= malQueryMinLength {
			cut = cut[:i]
		}

		return cut, true
	}

	return string(runes), true
}

func (c client) searchAnimeMal(ctx context.Context, query string, limit int) (SearchAnimeResponse, error) {
	q, ok := malQuery(query)
	if !ok {
		return SearchAnimeResponse{}, nil
	}

	var response malSearchResponse
	if _, err := c.requester.Request(ctx, "/anime", map[string]string{
		"q":      q,
		"limit":  strconv.Itoa(limit),
		"fields": malFields,
	}, &response); err != nil {
		return SearchAnimeResponse{}, err
	}

	result := SearchAnimeResponse{Data: make([]AnimeResult, 0, len(response.Data))}
	for _, item := range response.Data {
		result.Data = append(result.Data, item.Node.animeResult())
	}

	return result, nil
}
