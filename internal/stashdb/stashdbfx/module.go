package stashdbfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/stashdb"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"stashdb",
		configfx.NewConfigModule[stashdb.Config]("stashdb", stashdb.NewDefaultConfig()),
		fx.Provide(
			stashdb.New,
		),
	)
}
