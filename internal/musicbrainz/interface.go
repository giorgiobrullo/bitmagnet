package musicbrainz

import "context"

type Client interface {
	SearchRelease(ctx context.Context, req SearchReleaseRequest) (SearchReleaseResponse, error)
}

type SearchReleaseRequest struct {
	Query string
	Limit int
}

type SearchReleaseResponse struct {
	Count    int              `json:"count"`
	Offset   int              `json:"offset"`
	Releases []ReleaseResult  `json:"releases"`
}

type ReleaseResult struct {
	ID               string          `json:"id"`
	Score            int             `json:"score"`
	Title            string          `json:"title"`
	Status           string          `json:"status"`
	Date             string          `json:"date"`
	Country          string          `json:"country"`
	Barcode          string          `json:"barcode"`
	TrackCount       int             `json:"track-count"`
	ArtistCredit     []ArtistCredit  `json:"artist-credit"`
	ReleaseGroup     *ReleaseGroup   `json:"release-group"`
	LabelInfo        []LabelInfo     `json:"label-info"`
}

type ArtistCredit struct {
	Name       string `json:"name"`
	JoinPhrase string `json:"joinphrase"`
	Artist     Artist `json:"artist"`
}

type Artist struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	SortName string `json:"sort-name"`
}

type ReleaseGroup struct {
	ID          string `json:"id"`
	PrimaryType string `json:"primary-type"`
	Title       string `json:"title"`
}

type LabelInfo struct {
	CatalogNumber string `json:"catalog-number"`
	Label         *Label `json:"label"`
}

type Label struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
