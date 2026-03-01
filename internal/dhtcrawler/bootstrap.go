package dhtcrawler

import (
	"context"
	"net"
	"net/netip"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/protocol/dht/ktable"
)

func (c *crawler) reseedBootstrapNodes(ctx context.Context) {
	interval := time.Duration(0)

	for {
		select {
		case <-ctx.Done():
			return
		case <-time.After(interval):
			for _, strAddr := range c.bootstrapNodes {
				addr, err := net.ResolveUDPAddr("udp", strAddr)
				if err != nil {
					c.logger.Warnf("failed to resolve bootstrap node address: %s", err)
					continue
				}
				addrPort := addr.AddrPort()
				// Normalize IPv4-mapped IPv6 addresses to plain IPv4:
				addrPort = netip.AddrPortFrom(addrPort.Addr().Unmap(), addrPort.Port())
				select {
				case <-ctx.Done():
					return
				case c.nodesForPing.In() <- ktable.NewNode(ktable.ID{}, addrPort):
					continue
				}
			}
		}

		interval = c.reseedBootstrapNodesInterval
	}
}
