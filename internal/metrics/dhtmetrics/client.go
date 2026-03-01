package dhtmetrics

import (
	"context"
	"strings"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/concurrency"
	"github.com/bitmagnet-io/bitmagnet/internal/lazy"
	"github.com/bitmagnet-io/bitmagnet/internal/metrics"
	"github.com/bitmagnet-io/bitmagnet/internal/protocol/dht/ktable"
	"github.com/bitmagnet-io/bitmagnet/internal/protocol/dht/server"
	"github.com/bitmagnet-io/bitmagnet/internal/worker"
	"go.uber.org/fx"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Stats struct {
	NodesCountIPv4     int
	NodesCountIPv6     int
	HashesCountIPv4    int
	HashesCountIPv6    int
	ServerStartTime    time.Time
	ServerLastSuccess  time.Time
	ServerLastResponse time.Time
	CrawlerActive      bool
}

type MetricsRequest struct {
	BucketDuration metrics.BucketDuration
	StartTime      time.Time
	EndTime        time.Time
}

type Snapshot struct {
	Bucket     time.Time
	NodesIPv4  int
	NodesIPv6  int
	HashesIPv4 int
	HashesIPv6 int
}

type Client interface {
	GetStats() Stats
	RequestMetrics(ctx context.Context, req MetricsRequest) ([]Snapshot, error)
}

type Params struct {
	fx.In
	KTable           ktable.Table                                  `name:"ipv4"`
	KTable6          ktable.Table                                  `name:"ipv6"`
	LastResponses    *concurrency.AtomicValue[server.LastResponses] `name:"dht_server_last_responses"`
	DhtCrawlerActive *concurrency.AtomicValue[bool]                `name:"dht_crawler_active"`
	DB               lazy.Lazy[*gorm.DB]
	Logger           *zap.SugaredLogger
}

type Result struct {
	fx.Out
	Client Client
	Worker worker.Worker `group:"workers"`
}

func New(p Params) Result {
	c := &client{
		kTable:           p.KTable,
		kTable6:          p.KTable6,
		lastResponses:    p.LastResponses,
		dhtCrawlerActive: p.DhtCrawlerActive,
		db:               p.DB,
		logger:           p.Logger.Named("dht_snapshots"),
	}
	return Result{
		Client: c,
		Worker: worker.NewWorker(
			"dht_snapshots",
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
	kTable           ktable.Table
	kTable6          ktable.Table
	lastResponses    *concurrency.AtomicValue[server.LastResponses]
	dhtCrawlerActive *concurrency.AtomicValue[bool]
	db               lazy.Lazy[*gorm.DB]
	logger           *zap.SugaredLogger
	stopped          chan struct{}
}

func (c *client) GetStats() Stats {
	stats4 := c.kTable.Stats()
	stats6 := c.kTable6.Stats()
	lr := c.lastResponses.Get()
	return Stats{
		NodesCountIPv4:     stats4.NodesCount,
		NodesCountIPv6:     stats6.NodesCount,
		HashesCountIPv4:    stats4.HashesCount,
		HashesCountIPv6:    stats6.HashesCount,
		ServerStartTime:    lr.StartTime,
		ServerLastSuccess:  lr.LastSuccess,
		ServerLastResponse: lr.LastResponse,
		CrawlerActive:      c.dhtCrawlerActive.Get(),
	}
}

func (c *client) RequestMetrics(ctx context.Context, req MetricsRequest) ([]Snapshot, error) {
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

	var result []Snapshot
	if err := db.WithContext(ctx).Raw(`SELECT
		date_trunc(?, recorded_at) AS bucket,
		AVG(nodes_ipv4)::int AS nodes_ipv4,
		AVG(nodes_ipv6)::int AS nodes_ipv6,
		AVG(hashes_ipv4)::int AS hashes_ipv4,
		AVG(hashes_ipv6)::int AS hashes_ipv6
		FROM dht_snapshots `+
		conditionClause+
		` GROUP BY bucket ORDER BY bucket`,
		params...,
	).Scan(&result).Error; err != nil {
		return nil, err
	}

	return result, nil
}

const (
	snapshotInterval = 30 * time.Second
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

	stats := c.GetStats()
	if err := db.Exec(
		"INSERT INTO dht_snapshots (nodes_ipv4, nodes_ipv6, hashes_ipv4, hashes_ipv6) VALUES (?, ?, ?, ?)",
		stats.NodesCountIPv4, stats.NodesCountIPv6, stats.HashesCountIPv4, stats.HashesCountIPv6,
	).Error; err != nil {
		c.logger.Warnw("failed to record dht snapshot", "error", err)
	}
}

func (c *client) cleanupOldSnapshots() {
	db, err := c.db.Get()
	if err != nil {
		return
	}

	cutoff := time.Now().Add(-retentionPeriod)
	if err := db.Exec("DELETE FROM dht_snapshots WHERE recorded_at < ?", cutoff).Error; err != nil {
		c.logger.Warnw("failed to cleanup old dht snapshots", "error", err)
	}
}
