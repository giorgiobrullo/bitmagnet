package metatube

type Config struct {
	Enabled bool
}

func NewDefaultConfig() Config {
	return Config{
		Enabled: false,
	}
}
