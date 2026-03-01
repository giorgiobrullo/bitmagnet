package dhtmetrics

import (
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/concurrency"
	"github.com/bitmagnet-io/bitmagnet/internal/protocol/dht/ktable"
	"github.com/bitmagnet-io/bitmagnet/internal/protocol/dht/server"
	"go.uber.org/fx"
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

type Client interface {
	GetStats() Stats
}

type Params struct {
	fx.In
	KTable           ktable.Table                                   `name:"ipv4"`
	KTable6          ktable.Table                                   `name:"ipv6"`
	LastResponses    *concurrency.AtomicValue[server.LastResponses]  `name:"dht_server_last_responses"`
	DhtCrawlerActive *concurrency.AtomicValue[bool]                 `name:"dht_crawler_active"`
}

type Result struct {
	fx.Out
	Client Client
}

func New(p Params) Result {
	return Result{
		Client: &client{
			kTable:           p.KTable,
			kTable6:          p.KTable6,
			lastResponses:    p.LastResponses,
			dhtCrawlerActive: p.DhtCrawlerActive,
		},
	}
}

type client struct {
	kTable           ktable.Table
	kTable6          ktable.Table
	lastResponses    *concurrency.AtomicValue[server.LastResponses]
	dhtCrawlerActive *concurrency.AtomicValue[bool]
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
