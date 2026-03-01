package gqlmodel

import (
	"context"
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

func (dq DhtQuery) Metrics(
	ctx context.Context,
	input gen.DhtMetricsInput,
) (gen.DhtMetricsResult, error) {
	req := dhtmetrics.MetricsRequest{
		StartTime: nilToZero(input.StartTime.Value()),
		EndTime:   nilToZero(input.EndTime.Value()),
	}

	switch input.BucketDuration {
	case gen.MetricsBucketDurationMinute:
		req.BucketDuration = "minute"
	case gen.MetricsBucketDurationHour:
		req.BucketDuration = "hour"
	case gen.MetricsBucketDurationDay:
		req.BucketDuration = "day"
	}

	snapshots, err := dq.DhtMetricsClient.RequestMetrics(ctx, req)
	if err != nil {
		return gen.DhtMetricsResult{}, err
	}

	result := make([]gen.DhtSnapshot, len(snapshots))
	for i, s := range snapshots {
		result[i] = gen.DhtSnapshot{
			Bucket:     s.Bucket,
			NodesIPv4:  s.NodesIPv4,
			NodesIPv6:  s.NodesIPv6,
			HashesIPv4: s.HashesIPv4,
			HashesIPv6: s.HashesIPv6,
		}
	}

	return gen.DhtMetricsResult{
		Snapshots: result,
	}, nil
}

func timePtr(t time.Time) *time.Time {
	if t.IsZero() {
		return nil
	}
	return &t
}
