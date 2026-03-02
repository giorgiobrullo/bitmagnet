package deezerfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/deezer"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"deezer",
		configfx.NewConfigModule[deezer.Config]("deezer", deezer.NewDefaultConfig()),
		fx.Provide(
			deezer.New,
		),
	)
}
