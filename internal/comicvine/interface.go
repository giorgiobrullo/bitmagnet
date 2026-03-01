package comicvine

import "context"

type Client interface {
	SearchVolumes(ctx context.Context, req SearchVolumesRequest) (SearchVolumesResponse, error)
}

type SearchVolumesRequest struct {
	Query string
	Limit int
}

type SearchVolumesResponse struct {
	Error                string         `json:"error"`
	Limit                int            `json:"limit"`
	Offset               int            `json:"offset"`
	NumberOfPageResults  int            `json:"number_of_page_results"`
	NumberOfTotalResults int            `json:"number_of_total_results"`
	StatusCode           int            `json:"status_code"`
	Results              []VolumeResult `json:"results"`
}

type VolumeResult struct {
	ID             int        `json:"id"`
	Name           string     `json:"name"`
	StartYear      string     `json:"start_year"`
	CountOfIssues  int        `json:"count_of_issues"`
	Deck           string     `json:"deck"`
	Description    string     `json:"description"`
	Publisher      *Publisher `json:"publisher"`
	Image          *Image     `json:"image"`
	SiteDetailURL  string     `json:"site_detail_url"`
}

type Publisher struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Image struct {
	MediumURL string `json:"medium_url"`
	SmallURL  string `json:"small_url"`
}
