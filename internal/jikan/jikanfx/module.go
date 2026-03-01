package jikanfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/jikan"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"jikan",
		configfx.NewConfigModule[jikan.Config]("jikan", jikan.NewDefaultConfig()),
		fx.Provide(
			jikan.New,
		),
	)
}
