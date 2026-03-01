package musicbrainz

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
		BaseURL:        "https://musicbrainz.org/ws/2",
		RateLimit:      time.Second, // MusicBrainz enforces strict 1 req/sec.
		RateLimitBurst: 1,
	}
}
