package igdb

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	ClientID       string
	ClientSecret   string
	RateLimit      time.Duration
	RateLimitBurst int
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "https://api.igdb.com/v4",
		RateLimit:      250 * time.Millisecond,
		RateLimitBurst: 4,
	}
}
