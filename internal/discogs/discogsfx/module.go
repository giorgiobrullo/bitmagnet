package discogsfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/discogs"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"discogs",
		configfx.NewConfigModule[discogs.Config]("discogs", discogs.NewDefaultConfig()),
		fx.Provide(
			discogs.New,
		),
	)
}
