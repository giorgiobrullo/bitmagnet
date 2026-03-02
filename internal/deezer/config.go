package deezer

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
		BaseURL:        "https://api.deezer.com",
		RateLimit:      200 * time.Millisecond, // ~50 req/5s.
		RateLimitBurst: 5,
	}
}
