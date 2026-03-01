package googlebooks

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	APIKey         string
	RateLimit      time.Duration
	RateLimitBurst int
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "https://www.googleapis.com/books/v1",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
}
