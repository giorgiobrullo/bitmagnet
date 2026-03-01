package openlibraryfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/openlibrary"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"openlibrary",
		configfx.NewConfigModule[openlibrary.Config]("openlibrary", openlibrary.NewDefaultConfig()),
		fx.Provide(
			openlibrary.New,
		),
	)
}
