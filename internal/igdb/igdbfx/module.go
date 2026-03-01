package igdbfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/igdb"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"igdb",
		configfx.NewConfigModule[igdb.Config]("igdb", igdb.NewDefaultConfig()),
		fx.Provide(
			igdb.New,
		),
	)
}
