package comicvine

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
		BaseURL:        "https://comicvine.gamespot.com/api",
		RateLimit:      time.Second,
		RateLimitBurst: 1,
	}
}
