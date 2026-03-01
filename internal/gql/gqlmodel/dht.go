package gqlmodel

import (
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/gql/gqlmodel/gen"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics/dhtmetrics"
)

type DhtQuery struct {
	DhtMetricsClient dhtmetrics.Client
}

func (dq DhtQuery) Stats() (gen.DhtStats, error) {
	s := dq.DhtMetricsClient.GetStats()
	return gen.DhtStats{
		NodesCountIPv4:     s.NodesCountIPv4,
		NodesCountIPv6:     s.NodesCountIPv6,
		HashesCountIPv4:    s.HashesCountIPv4,
		HashesCountIPv6:    s.HashesCountIPv6,
		ServerStartTime:    timePtr(s.ServerStartTime),
		ServerLastSuccess:  timePtr(s.ServerLastSuccess),
		ServerLastResponse: timePtr(s.ServerLastResponse),
		CrawlerActive:      s.CrawlerActive,
	}, nil
}

func timePtr(t time.Time) *time.Time {
	if t.IsZero() {
		return nil
	}
	return &t
}
