package googlebooksfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/googlebooks"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"googlebooks",
		configfx.NewConfigModule[googlebooks.Config]("googlebooks", googlebooks.NewDefaultConfig()),
		fx.Provide(
			googlebooks.New,
		),
	)
}
