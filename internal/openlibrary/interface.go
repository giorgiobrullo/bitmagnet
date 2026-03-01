package openlibrary

import "context"

type Client interface {
	SearchBooks(ctx context.Context, req SearchBooksRequest) (SearchBooksResponse, error)
}

type SearchBooksRequest struct {
	Query string
	Limit int
}

type SearchBooksResponse struct {
	NumFound int         `json:"numFound"`
	Start    int         `json:"start"`
	Docs     []DocResult `json:"docs"`
}

type DocResult struct {
	Key              string   `json:"key"`
	Title            string   `json:"title"`
	AuthorName       []string `json:"author_name"`
	FirstPublishYear int      `json:"first_publish_year"`
	CoverI           int      `json:"cover_i"`
	Publisher        []string `json:"publisher"`
	Subject          []string `json:"subject"`
	Language         []string `json:"language"`
	EditionCount     int      `json:"edition_count"`
	ISBN             []string `json:"isbn"`
	NumberOfPages    int      `json:"number_of_pages_median"`
}
