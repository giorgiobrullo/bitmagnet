package anilist

import "context"

type Client interface {
	SearchAnime(ctx context.Context, req SearchRequest) ([]MediaResult, error)
	SearchManga(ctx context.Context, req SearchRequest) ([]MediaResult, error)
}

type SearchRequest struct {
	Query string
	Limit int
}

type MediaResult struct {
	ID         int        `json:"id"`
	Title      MediaTitle `json:"title"`
	Format     string     `json:"format"`
	Episodes   int        `json:"episodes"`
	Chapters   int        `json:"chapters"`
	Volumes    int        `json:"volumes"`
	SeasonYear int        `json:"seasonYear"`
	Genres     []string   `json:"genres"`
	AverageScore int      `json:"averageScore"`
	CoverImage CoverImage `json:"coverImage"`
	StartDate  FuzzyDate  `json:"startDate"`
	Studios    Studios    `json:"studios"`
	IsAdult    bool       `json:"isAdult"`
}

type MediaTitle struct {
	Romaji  string `json:"romaji"`
	English string `json:"english"`
	Native  string `json:"native"`
}

type CoverImage struct {
	Large string `json:"large"`
}

type FuzzyDate struct {
	Year  int `json:"year"`
	Month int `json:"month"`
	Day   int `json:"day"`
}

type Studios struct {
	Nodes []Studio `json:"nodes"`
}

type Studio struct {
	Name string `json:"name"`
}
