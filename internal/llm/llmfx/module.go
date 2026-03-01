package llmfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/llm"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"llm",
		configfx.NewConfigModule[llm.Config]("llm", llm.NewDefaultConfig()),
		fx.Provide(
			llm.New,
		),
	)
}
