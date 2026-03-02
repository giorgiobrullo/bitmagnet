package openlibrary

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
		BaseURL:        "https://openlibrary.org",
		RateLimit:      334 * time.Millisecond, // OpenLibrary allows 3 req/s with User-Agent.
		RateLimitBurst: 3,
	}
}
