package porndbfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"porndb",
		configfx.NewConfigModule[porndb.Config]("porndb", porndb.NewDefaultConfig()),
		fx.Provide(
			porndb.New,
		),
	)
}
