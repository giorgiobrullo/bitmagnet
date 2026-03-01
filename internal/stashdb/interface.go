package stashdb

import "context"

type Client interface {
	SearchScenes(ctx context.Context, req SearchScenesRequest) (SearchScenesResponse, error)
}

type SearchScenesRequest struct {
	Term    string
	Page    int
	PerPage int
}

type SearchScenesResponse struct {
	Scenes []SceneResult
	Count  int
}

type SceneResult struct {
	ID          string
	Title       string
	ReleaseDate string
	Duration    int // seconds
	Studio      *Studio
	Performers  []PerformerAppearance
	Images      []Image
	Tags        []Tag
}

type Studio struct {
	ID   string
	Name string
}

type PerformerAppearance struct {
	Performer Performer
	As        string
}

type Performer struct {
	ID   string
	Name string
}

type Image struct {
	URL    string
	Width  int
	Height int
}

type Tag struct {
	ID   string
	Name string
}
