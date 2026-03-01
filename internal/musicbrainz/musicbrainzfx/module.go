package musicbrainzfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/musicbrainz"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"musicbrainz",
		configfx.NewConfigModule[musicbrainz.Config]("musicbrainz", musicbrainz.NewDefaultConfig()),
		fx.Provide(
			musicbrainz.New,
		),
	)
}
