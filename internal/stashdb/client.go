package stashdb

import (
	"context"
	"fmt"
)

type client struct {
	requester Requester
}

const searchScenesQuery = `query SearchScene($term: String!) {
  searchScene(term: $term) {
    id
    title
    release_date
    duration
    studio {
      id
      name
    }
    performers {
      performer {
        id
        name
      }
      as
    }
    images {
      url
      width
      height
    }
    tags {
      id
      name
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
	SearchScene []graphQLScene `json:"searchScene"`
}

type graphQLScene struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	ReleaseDate string `json:"release_date"`
	Duration    *int   `json:"duration"`
	Studio      *struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	} `json:"studio"`
	Performers []struct {
		Performer struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"performer"`
		As string `json:"as"`
	} `json:"performers"`
	Images []struct {
		URL    string `json:"url"`
		Width  int    `json:"width"`
		Height int    `json:"height"`
	} `json:"images"`
	Tags []struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	} `json:"tags"`
}

type graphQLError struct {
	Message string `json:"message"`
}

func (c client) SearchScenes(ctx context.Context, req SearchScenesRequest) (SearchScenesResponse, error) {
	gqlReq := graphQLRequest{
		Query: searchScenesQuery,
		Variables: map[string]any{
			"term": req.Term,
		},
	}

	var gqlResp graphQLResponse
	_, err := c.requester.Request(ctx, gqlReq, &gqlResp)
	if err != nil {
		return SearchScenesResponse{}, err
	}

	if len(gqlResp.Errors) > 0 {
		return SearchScenesResponse{}, fmt.Errorf("StashDB GraphQL error: %s", gqlResp.Errors[0].Message)
	}

	scenes := make([]SceneResult, 0, len(gqlResp.Data.SearchScene))
	for _, s := range gqlResp.Data.SearchScene {
		scene := SceneResult{
			ID:          s.ID,
			Title:       s.Title,
			ReleaseDate: s.ReleaseDate,
		}
		if s.Duration != nil {
			scene.Duration = *s.Duration
		}
		if s.Studio != nil {
			scene.Studio = &Studio{
				ID:   s.Studio.ID,
				Name: s.Studio.Name,
			}
		}
		for _, p := range s.Performers {
			scene.Performers = append(scene.Performers, PerformerAppearance{
				Performer: Performer{
					ID:   p.Performer.ID,
					Name: p.Performer.Name,
				},
				As: p.As,
			})
		}
		for _, img := range s.Images {
			scene.Images = append(scene.Images, Image{
				URL:    img.URL,
				Width:  img.Width,
				Height: img.Height,
			})
		}
		for _, t := range s.Tags {
			scene.Tags = append(scene.Tags, Tag{
				ID:   t.ID,
				Name: t.Name,
			})
		}
		scenes = append(scenes, scene)
	}

	return SearchScenesResponse{
		Scenes: scenes,
		Count:  len(scenes),
	}, nil
}
