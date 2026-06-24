package metricsfx

import (
	"github.com/bitmagnet-io/bitmagnet/internal/config/configfx"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics/dhtmetrics"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics/queuemetrics"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics/torrentmetrics"
	"go.uber.org/fx"
)

func New() fx.Option {
	return fx.Module(
		"queue",
		configfx.NewConfigModule[metrics.Config]("metrics", metrics.NewDefaultConfig()),
		fx.Provide(
			dhtmetrics.New,
			queuemetrics.New,
			torrentmetrics.New,
		),
	)
}
