package jikan

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
		BaseURL:        "https://api.jikan.moe/v4",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
}
