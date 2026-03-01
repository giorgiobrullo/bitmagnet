package comicvinefx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/comicvine"
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"comicvine",
		configfx.NewConfigModule[comicvine.Config]("comicvine", comicvine.NewDefaultConfig()),
		fx.Provide(
			comicvine.New,
		),
	)
}
