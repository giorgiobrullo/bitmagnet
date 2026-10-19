package jikan

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	RateLimit      time.Duration
	RateLimitBurst int
	// MalClientID switches lookups to MyAnimeList's official API, which serves the same data
	// as Jikan (an unofficial MAL scraper) without its outages; register a client at
	// https://myanimelist.net/apiconfig
	MalClientID string
}

const malBaseURL = "https://api.myanimelist.net/v2"

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "https://api.jikan.moe/v4",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
}
