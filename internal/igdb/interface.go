package igdb

import "context"

type Client interface {
	SearchGames(ctx context.Context, req SearchGamesRequest) ([]GameResult, error)
}

type SearchGamesRequest struct {
	Query string
	Limit int
}

type GameResult struct {
	ID               int64   `json:"id"`
	Name             string  `json:"name"`
	Summary          string  `json:"summary"`
	FirstReleaseDate *int64  `json:"first_release_date"`
	Cover            *Cover  `json:"cover"`
	Genres           []Genre `json:"genres"`
	Platforms        []Platform           `json:"platforms"`
	InvolvedCompanies []InvolvedCompany   `json:"involved_companies"`
}

type Cover struct {
	ID  int64  `json:"id"`
	URL string `json:"url"`
}

type Genre struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

type Platform struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

type InvolvedCompany struct {
	ID        int64   `json:"id"`
	Company   Company `json:"company"`
	Developer bool    `json:"developer"`
	Publisher bool    `json:"publisher"`
}

type Company struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
