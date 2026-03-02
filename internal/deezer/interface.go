package deezer

import "context"

type Client interface {
	SearchAlbum(ctx context.Context, req SearchAlbumRequest) (SearchAlbumResponse, error)
}

type SearchAlbumRequest struct {
	Query string
	Limit int
}

type SearchAlbumResponse struct {
	Data  []AlbumResult `json:"data"`
	Total int           `json:"total"`
}

type AlbumResult struct {
	ID         int    `json:"id"`
	Title      string `json:"title"`
	Link       string `json:"link"`
	CoverXL    string `json:"cover_xl"`
	CoverBig   string `json:"cover_big"`
	GenreID    int    `json:"genre_id"`
	NbTracks   int    `json:"nb_tracks"`
	RecordType string `json:"record_type"`
	Artist     Artist `json:"artist"`
}

type Artist struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
