package anilist

import (
	"context"
	"fmt"
)

type client struct {
	requester Requester
}

const searchMediaQuery = `query ($search: String!, $type: MediaType!, $perPage: Int!) {
  Page(page: 1, perPage: $perPage) {
    media(search: $search, type: $type) {
      id
      title { romaji english native }
      format
      episodes
      chapters
      volumes
      seasonYear
      genres
      averageScore
      coverImage { large }
      startDate { year month day }
      studios(isMain: true) { nodes { name } }
      isAdult
    }
  }
}`

type graphQLRequest struct {
	Query     string         `json:"query"`
	Variables map[string]any `json:"variables"`
}

type graphQLResponse struct {
	Data   graphQLData    `json:"data"`
	Errors []graphQLError `json:"errors,omitempty"`
}

type graphQLData struct {
	Page graphQLPage `json:"Page"`
}

type graphQLPage struct {
	Media []MediaResult `json:"media"`
}

type graphQLError struct {
	Message string `json:"message"`
}

func (c client) SearchAnime(ctx context.Context, req SearchRequest) ([]MediaResult, error) {
	return c.searchMedia(ctx, req, "ANIME")
}

func (c client) SearchManga(ctx context.Context, req SearchRequest) ([]MediaResult, error) {
	return c.searchMedia(ctx, req, "MANGA")
}

func (c client) searchMedia(ctx context.Context, req SearchRequest, mediaType string) ([]MediaResult, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}

	gqlReq := graphQLRequest{
		Query: searchMediaQuery,
		Variables: map[string]any{
			"search":  req.Query,
			"type":    mediaType,
			"perPage": limit,
		},
	}

	var gqlResp graphQLResponse
	_, err := c.requester.Request(ctx, gqlReq, &gqlResp)
	if err != nil {
		return nil, err
	}

	if len(gqlResp.Errors) > 0 {
		return nil, fmt.Errorf("AniList GraphQL error: %s", gqlResp.Errors[0].Message)
	}

	return gqlResp.Data.Page.Media, nil
}
