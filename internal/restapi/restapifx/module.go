package restapifx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/restapi/httpserver"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"rest_api",
		fx.Provide(
			fx.Annotate(
				httpserver.New,
				fx.ResultTags(`group:"http_server_options"`),
			),
		),
	)
}
