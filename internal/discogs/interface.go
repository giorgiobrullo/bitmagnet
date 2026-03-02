package discogs

import "context"

type Client interface {
	SearchRelease(ctx context.Context, req SearchReleaseRequest) (SearchReleaseResponse, error)
}

type SearchReleaseRequest struct {
	Query string
	Limit int
}

type SearchReleaseResponse struct {
	Pagination Pagination      `json:"pagination"`
	Results    []ReleaseResult `json:"results"`
}

type Pagination struct {
	Page    int `json:"page"`
	PerPage int `json:"per_page"`
	Pages   int `json:"pages"`
	Items   int `json:"items"`
}

type ReleaseResult struct {
	ID         int      `json:"id"`
	Type       string   `json:"type"`
	MasterID   int      `json:"master_id"`
	Title      string   `json:"title"` // Format: "Artist - Album"
	Year       string   `json:"year"`
	Country    string   `json:"country"`
	Genre      []string `json:"genre"`
	Style      []string `json:"style"`
	Label      []string `json:"label"`
	Format     []string `json:"format"`
	CoverImage string   `json:"cover_image"`
	Thumb      string   `json:"thumb"`
}
