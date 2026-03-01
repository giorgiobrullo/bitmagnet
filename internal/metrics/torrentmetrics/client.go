package torrentmetrics

import (
	"context"
	"strings"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/lazy"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/worker"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Bucket struct {
	Source  string
	Bucket  time.Time
	Updated bool
	Count   uint
}

type Request struct {
	BucketDuration metrics.BucketDuration
	Sources        []string
	StartTime      time.Time
	EndTime        time.Time
	Updated        model.NullBool
}

type LibraryMetricsRequest struct {
	BucketDuration metrics.BucketDuration
	StartTime      time.Time
	EndTime        time.Time
}

type LibrarySnapshot struct {
	Bucket     time.Time
	TotalCount int
	TotalSize  float64
}

type ContentCount struct {
	ContentType string
	Count       int
}

type Client interface {
	Request(context.Context, Request) ([]Bucket, error)
	RequestLibraryMetrics(ctx context.Context, req LibraryMetricsRequest) ([]LibrarySnapshot, error)
	ContentBreakdown(ctx context.Context) ([]ContentCount, error)
}

type Params struct {
	fx.In
	DB     lazy.Lazy[*gorm.DB]
	Logger *zap.SugaredLogger
}

type Result struct {
	fx.Out
	Client Client
	Worker worker.Worker `group:"workers"`
}

func New(p Params) Result {
	c := &client{
		db:     p.DB,
		logger: p.Logger.Named("torrent_snapshots"),
	}
	return Result{
		Client: c,
		Worker: worker.NewWorker(
			"torrent_snapshots",
			fx.Hook{
				OnStart: func(context.Context) error {
					c.stopped = make(chan struct{})
					go c.runSnapshotWorker()
					return nil
				},
				OnStop: func(context.Context) error {
					if c.stopped != nil {
						close(c.stopped)
					}
					return nil
				},
			},
		),
	}
}

type client struct {
	db      lazy.Lazy[*gorm.DB]
	logger  *zap.SugaredLogger
	stopped chan struct{}
}

func (c *client) Request(ctx context.Context, req Request) ([]Bucket, error) {
	db, err := c.db.Get()
	if err != nil {
		return nil, err
	}

	params := []any{
		req.BucketDuration,
	}

	var conditions []string
	if !req.StartTime.IsZero() {
		conditions = append(conditions, "updated_at >= ?")
		params = append(params, req.StartTime)
	}

	if !req.EndTime.IsZero() {
		conditions = append(conditions, "updated_at <= ?")
		params = append(params, req.EndTime)
	}

	if req.Sources != nil {
		conditions = append(conditions, "source IN ?")
		params = append(params, req.Sources)
	}

	if req.Updated.Valid {
		sign := ">"
		if !req.Updated.Bool {
			sign = "<="
		}

		conditions = append(conditions, "updated_at "+sign+" (created_at + interval '1 hour')")
	}

	conditionClause := ""
	if len(conditions) > 0 {
		conditionClause = "WHERE (" + strings.Join(conditions, " AND ") + ")"
	}

	var result []Bucket
	if err := db.WithContext(ctx).Raw(`select
        source,
        date_trunc(?, updated_at) as bucket,
        updated_at > (created_at + interval '1 hour') as updated,
        count(*) as count
        from torrents_torrent_sources
       `+
		conditionClause+
		`
    group by source, bucket, updated
    order by source, bucket, updated`,
		params...,
	).Scan(&result).Error; err != nil {
		return nil, err
	}

	return result, nil
}

func (c *client) RequestLibraryMetrics(ctx context.Context, req LibraryMetricsRequest) ([]LibrarySnapshot, error) {
	db, err := c.db.Get()
	if err != nil {
		return nil, err
	}

	params := []any{
		req.BucketDuration,
	}

	var conditions []string
	if !req.StartTime.IsZero() {
		conditions = append(conditions, "recorded_at >= ?")
		params = append(params, req.StartTime)
	}

	if !req.EndTime.IsZero() {
		conditions = append(conditions, "recorded_at <= ?")
		params = append(params, req.EndTime)
	}

	conditionClause := ""
	if len(conditions) > 0 {
		conditionClause = "WHERE " + strings.Join(conditions, " AND ")
	}

	var result []LibrarySnapshot
	if err := db.WithContext(ctx).Raw(`SELECT
		date_trunc(?, recorded_at) AS bucket,
		AVG(total_count)::int AS total_count,
		AVG(total_size)::float8 AS total_size
		FROM torrent_snapshots `+
		conditionClause+
		` GROUP BY bucket ORDER BY bucket`,
		params...,
	).Scan(&result).Error; err != nil {
		return nil, err
	}

	return result, nil
}

func (c *client) ContentBreakdown(ctx context.Context) ([]ContentCount, error) {
	db, err := c.db.Get()
	if err != nil {
		return nil, err
	}

	var result []ContentCount
	if err := db.WithContext(ctx).Raw(`SELECT content_type, COUNT(*) as count
		FROM torrent_contents
		WHERE content_type IS NOT NULL
		GROUP BY content_type ORDER BY count DESC`,
	).Scan(&result).Error; err != nil {
		return nil, err
	}

	return result, nil
}

const (
	snapshotInterval = 60 * time.Second
	cleanupInterval  = time.Hour
	retentionPeriod  = 7 * 24 * time.Hour
)

func (c *client) runSnapshotWorker() {
	snapshotTicker := time.NewTicker(snapshotInterval)
	cleanupTicker := time.NewTicker(cleanupInterval)
	defer snapshotTicker.Stop()
	defer cleanupTicker.Stop()

	for {
		select {
		case <-c.stopped:
			return
		case <-snapshotTicker.C:
			c.recordSnapshot()
		case <-cleanupTicker.C:
			c.cleanupOldSnapshots()
		}
	}
}

func (c *client) recordSnapshot() {
	db, err := c.db.Get()
	if err != nil {
		c.logger.Warnw("failed to get db for snapshot", "error", err)
		return
	}

	if err := db.Exec(
		"INSERT INTO torrent_snapshots (total_count, total_size) SELECT COUNT(*), COALESCE(SUM(size), 0) FROM torrents",
	).Error; err != nil {
		c.logger.Warnw("failed to record torrent snapshot", "error", err)
	}
}

func (c *client) cleanupOldSnapshots() {
	db, err := c.db.Get()
	if err != nil {
		return
	}

	cutoff := time.Now().Add(-retentionPeriod)
	if err := db.Exec("DELETE FROM torrent_snapshots WHERE recorded_at < ?", cutoff).Error; err != nil {
		c.logger.Warnw("failed to cleanup old torrent snapshots", "error", err)
	}
}
