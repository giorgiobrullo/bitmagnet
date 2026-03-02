package llm

import "time"

type Config struct {
	Enabled        bool
	BaseURL        string
	Model          string
	Timeout        time.Duration
	MinConfidence  float64
	RateLimit      time.Duration
	RateLimitBurst int
	Concurrency    int
}

func NewDefaultConfig() Config {
	return Config{
		Enabled:        false,
		BaseURL:        "http://localhost:8080",
		Timeout:        30 * time.Second,
		MinConfidence:  0.7,
		RateLimit:      334 * time.Millisecond,
		RateLimitBurst: 2,
		Concurrency:    2,
	}
}
