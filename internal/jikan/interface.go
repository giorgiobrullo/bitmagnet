package jikan

import "context"

type Client interface {
	SearchAnime(ctx context.Context, req SearchAnimeRequest) (SearchAnimeResponse, error)
}

type SearchAnimeRequest struct {
	Query string
	Limit int
}

type SearchAnimeResponse struct {
	Data []AnimeResult `json:"data"`
}

type AnimeResult struct {
	MalID         int          `json:"mal_id"`
	Title         string       `json:"title"`
	TitleEnglish  string       `json:"title_english"`
	TitleJapanese string       `json:"title_japanese"`
	Type          string       `json:"type"`
	Episodes      int          `json:"episodes"`
	Status        string       `json:"status"`
	Score         float64      `json:"score"`
	Year          int          `json:"year"`
	Images        AnimeImages  `json:"images"`
	Studios       []NamedEntry `json:"studios"`
	Genres        []NamedEntry `json:"genres"`
}

type AnimeImages struct {
	JPG ImageURLs `json:"jpg"`
}

type ImageURLs struct {
	ImageURL      string `json:"image_url"`
	SmallImageURL string `json:"small_image_url"`
	LargeImageURL string `json:"large_image_url"`
}

type NamedEntry struct {
	MalID int    `json:"mal_id"`
	Name  string `json:"name"`
}
