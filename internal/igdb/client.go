package igdb

import (
	"context"
	"fmt"
)

type client struct {
	requester Requester
}

func (c client) SearchGames(ctx context.Context, req SearchGamesRequest) ([]GameResult, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}

	body := fmt.Sprintf(
		`search "%s"; fields name,summary,first_release_date,cover.url,genres.name,platforms.name,involved_companies.company.name,involved_companies.developer,involved_companies.publisher; limit %d;`,
		escapeApicalypse(req.Query),
		limit,
	)

	var results []GameResult
	_, err := c.requester.Request(ctx, "/games", body, &results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func escapeApicalypse(s string) string {
	var out []byte
	for _, b := range []byte(s) {
		if b == '"' || b == '\\' {
			out = append(out, '\\')
		}
		out = append(out, b)
	}
	return string(out)
}
