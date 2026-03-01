package googlebooks

import "context"

type Client interface {
	SearchVolumes(ctx context.Context, req SearchVolumesRequest) (SearchVolumesResponse, error)
}

type SearchVolumesRequest struct {
	Query string
	Limit int
}

type SearchVolumesResponse struct {
	TotalItems int            `json:"totalItems"`
	Items      []VolumeResult `json:"items"`
}

type VolumeResult struct {
	ID         string     `json:"id"`
	VolumeInfo VolumeInfo `json:"volumeInfo"`
}

type VolumeInfo struct {
	Title               string               `json:"title"`
	Authors             []string             `json:"authors"`
	Publisher           string               `json:"publisher"`
	PublishedDate       string               `json:"publishedDate"`
	Description         string               `json:"description"`
	PageCount           int                  `json:"pageCount"`
	Categories          []string             `json:"categories"`
	ImageLinks          *ImageLinks          `json:"imageLinks"`
	IndustryIdentifiers []IndustryIdentifier `json:"industryIdentifiers"`
	Language            string               `json:"language"`
}

type ImageLinks struct {
	SmallThumbnail string `json:"smallThumbnail"`
	Thumbnail      string `json:"thumbnail"`
}

type IndustryIdentifier struct {
	Type       string `json:"type"`
	Identifier string `json:"identifier"`
}
