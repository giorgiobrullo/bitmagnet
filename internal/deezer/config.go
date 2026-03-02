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
		RateLimit:      125 * time.Millisecond, // Deezer allows 50 req/5s (10 req/s).
		RateLimitBurst: 8,
	}
}
