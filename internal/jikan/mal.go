package jikan

import (
	"strconv"
	"strings"
)

// Response shapes of MyAnimeList's official API (GET /v2/anime), converted to Jikan's so
// everything after the request is shared.
type malSearchResponse struct {
	Data []struct {
		Node malAnime `json:"node"`
	} `json:"data"`
}

type malAnime struct {
	ID                int    `json:"id"`
	Title             string `json:"title"`
	AlternativeTitles struct {
		En string `json:"en"`
		Ja string `json:"ja"`
	} `json:"alternative_titles"`
	StartDate   string `json:"start_date"`
	NumEpisodes int    `json:"num_episodes"`
	MediaType   string `json:"media_type"`
	MainPicture struct {
		Medium string `json:"medium"`
		Large  string `json:"large"`
	} `json:"main_picture"`
	Genres  []malNamedEntry `json:"genres"`
	Studios []malNamedEntry `json:"studios"`
}

type malNamedEntry struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

// Jikan's type names, so stored attributes don't depend on which API found the match.
var malMediaTypes = map[string]string{
	"tv":         "TV",
	"ova":        "OVA",
	"ona":        "ONA",
	"movie":      "Movie",
	"special":    "Special",
	"tv_special": "TV Special",
	"music":      "Music",
	"cm":         "CM",
	"pv":         "PV",
}

func (a malAnime) animeResult() AnimeResult {
	result := AnimeResult{
		MalID:         a.ID,
		Title:         a.Title,
		TitleEnglish:  a.AlternativeTitles.En,
		TitleJapanese: a.AlternativeTitles.Ja,
		Type:          a.MediaType,
		Episodes:      a.NumEpisodes,
	}

	if t, ok := malMediaTypes[a.MediaType]; ok {
		result.Type = t
	}

	// start_date is YYYY-MM-DD, YYYY-MM or YYYY
	if year, err := strconv.Atoi(strings.SplitN(a.StartDate, "-", 2)[0]); err == nil {
		result.Year = year
	}

	result.Images.JPG.LargeImageURL = a.MainPicture.Large
	result.Images.JPG.ImageURL = a.MainPicture.Medium

	for _, g := range a.Genres {
		result.Genres = append(result.Genres, NamedEntry{MalID: g.ID, Name: g.Name})
	}

	for _, s := range a.Studios {
		result.Studios = append(result.Studios, NamedEntry{MalID: s.ID, Name: s.Name})
	}

	return result
}
