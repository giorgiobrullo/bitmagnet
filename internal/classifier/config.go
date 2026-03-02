package classifier

type Config struct {
	Workflow           string
	Keywords           map[string][]string
	KeywordsOverride   map[string][]string
	Extensions         map[string][]string
	ExtensionsOverride map[string][]string
	Flags              map[string]any
	DeleteXxx          bool
	Concurrency        int
	Verbose            bool
}

func NewDefaultConfig() Config {
	return Config{
		Workflow:    "default",
		Concurrency: 20,
	}
}
