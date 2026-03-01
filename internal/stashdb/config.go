package stashdb

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
		BaseURL:        "https://stashdb.org/graphql",
		RateLimit:      500 * time.Millisecond,
		RateLimitBurst: 5,
	}
}
