package anilistfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/anilist"
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"anilist",
		configfx.NewConfigModule[anilist.Config]("anilist", anilist.NewDefaultConfig()),
		fx.Provide(
			anilist.New,
		),
	)
}
