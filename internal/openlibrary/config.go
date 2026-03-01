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
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
}
