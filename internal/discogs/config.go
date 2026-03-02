package discogs

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	Token          string
	RateLimit      time.Duration
	RateLimitBurst int
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "https://api.discogs.com",
		RateLimit:      time.Second, // 60 req/min authenticated.
		RateLimitBurst: 1,
	}
}
