package metatube

import "context"

type Client interface {
	SearchJAV(ctx context.Context, code string) (MovieResult, error)
}

type MovieResult struct {
	Provider    string
	Number      string // JAV code (e.g., "SONE-436")
	Title       string
	Actors      []string
	Maker       string // Studio
	Label       string
	Series      string
	Genres      []string
	CoverURL    string
	Score       float64
	Runtime     int    // minutes
	ReleaseDate string // YYYY-MM-DD
}
