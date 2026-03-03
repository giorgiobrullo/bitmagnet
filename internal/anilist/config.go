package anilist

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	RateLimit      time.Duration
	RateLimitBurst int
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "https://graphql.anilist.co",
		RateLimit:      2500 * time.Millisecond,
		RateLimitBurst: 1,
	}
}
