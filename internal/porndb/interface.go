package porndb

import "context"

type Client interface {
	SearchScenes(ctx context.Context, req SearchScenesRequest) (SearchScenesResponse, error)
	SearchJAV(ctx context.Context, req SearchJAVRequest) (SearchJAVResponse, error)
}

type SearchScenesRequest struct {
	Query string
}

type SearchScenesResponse struct {
	Data []SceneResult `json:"data"`
}

type SceneResult struct {
	ID          string      `json:"id"`
	Title       string      `json:"title"`
	Date        string      `json:"date"`
	Slug        string      `json:"slug"`
	Image       string      `json:"image"`
	Poster      string      `json:"poster"`
	Background  *ImageSet   `json:"background"`
	Duration    *int        `json:"duration"`
	Site        *Site       `json:"site"`
	Performers  []Performer `json:"performers"`
}

type ImageSet struct {
	Full   string `json:"full"`
	Large  string `json:"large"`
	Medium string `json:"medium"`
	Small  string `json:"small"`
}

type Site struct {
	UUID string `json:"uuid"`
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Performer struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type SearchJAVRequest struct {
	Query string
}

type SearchJAVResponse struct {
	Data []SceneResult `json:"data"`
}
