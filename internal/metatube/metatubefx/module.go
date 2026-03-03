package metatubefx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/metatube"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"metatube",
		configfx.NewConfigModule[metatube.Config]("metatube", metatube.NewDefaultConfig()),
		fx.Provide(
			metatube.New,
		),
	)
}
