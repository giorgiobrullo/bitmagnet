package gqlmodel

import (
	"context"

	"github.com/bitmagnet-io/bitmagnet/internal/gql/gqlmodel/gen"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics/torrentmetrics"
)

func (t TorrentQuery) Metrics(
	ctx context.Context,
	input gen.TorrentMetricsQueryInput,
) (*gen.TorrentMetricsQueryResult, error) {
	req := torrentmetrics.Request{
		StartTime: nilToZero(input.StartTime.Value()),
		EndTime:   nilToZero(input.EndTime.Value()),
		Sources:   input.Sources.Value(),
	}

	switch input.BucketDuration {
	case gen.MetricsBucketDurationMinute:
		req.BucketDuration = "minute"
	case gen.MetricsBucketDurationHour:
		req.BucketDuration = "hour"
	case gen.MetricsBucketDurationDay:
		req.BucketDuration = "day"
	}

	buckets, err := t.TorrentMetricsClient.Request(ctx, req)
	if err != nil {
		return nil, err
	}

	return &gen.TorrentMetricsQueryResult{
		Buckets: buckets,
	}, nil
}

func (t TorrentQuery) LibraryMetrics(
	ctx context.Context,
	input gen.TorrentLibraryMetricsInput,
) (gen.TorrentLibraryMetricsResult, error) {
	req := torrentmetrics.LibraryMetricsRequest{
		StartTime: nilToZero(input.StartTime.Value()),
		EndTime:   nilToZero(input.EndTime.Value()),
	}

	switch input.BucketDuration {
	case gen.MetricsBucketDurationMinute:
		req.BucketDuration = metrics.BucketDuration("minute")
	case gen.MetricsBucketDurationHour:
		req.BucketDuration = metrics.BucketDuration("hour")
	case gen.MetricsBucketDurationDay:
		req.BucketDuration = metrics.BucketDuration("day")
	}

	snapshots, err := t.TorrentMetricsClient.RequestLibraryMetrics(ctx, req)
	if err != nil {
		return gen.TorrentLibraryMetricsResult{}, err
	}

	result := make([]gen.TorrentLibrarySnapshot, len(snapshots))
	for i, s := range snapshots {
		result[i] = gen.TorrentLibrarySnapshot{
			Bucket:     s.Bucket,
			TotalCount: s.TotalCount,
			TotalSize:  s.TotalSize,
		}
	}

	return gen.TorrentLibraryMetricsResult{
		Snapshots: result,
	}, nil
}

func (t TorrentQuery) ContentBreakdown(
	ctx context.Context,
) ([]gen.TorrentContentBreakdown, error) {
	counts, err := t.TorrentMetricsClient.ContentBreakdown(ctx)
	if err != nil {
		return nil, err
	}

	result := make([]gen.TorrentContentBreakdown, len(counts))
	for i, c := range counts {
		result[i] = gen.TorrentContentBreakdown{
			ContentType: c.ContentType,
			Count:       c.Count,
		}
	}

	return result, nil
}
