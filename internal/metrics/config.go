package metrics

import "time"

type Config struct {
	// RetentionPeriod is how long metric snapshots (torrent library and DHT)
	// are kept before being cleaned up. Older snapshots are deleted periodically.
	RetentionPeriod time.Duration
}

func NewDefaultConfig() Config {
	return Config{
		RetentionPeriod: 90 * 24 * time.Hour,
	}
}
