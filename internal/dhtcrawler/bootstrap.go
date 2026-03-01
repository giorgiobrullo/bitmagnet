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
				host, portStr, err := net.SplitHostPort(strAddr)
				if err != nil {
					c.logger.Warnf("failed to parse bootstrap node address %s: %s", strAddr, err)
					continue
				}
				port, err := net.LookupPort("udp", portStr)
				if err != nil {
					c.logger.Warnf("failed to resolve port for %s: %s", strAddr, err)
					continue
				}
				ips, err := net.DefaultResolver.LookupNetIP(ctx, "ip", host)
				if err != nil {
					c.logger.Warnf("failed to resolve bootstrap node %s: %s", strAddr, err)
					continue
				}
				for _, ip := range ips {
					addrPort := netip.AddrPortFrom(ip.Unmap(), uint16(port))
					select {
					case <-ctx.Done():
						return
					case c.nodesForPing.In() <- ktable.NewNode(ktable.ID{}, addrPort):
						continue
					}
				}
			}
		}

		interval = c.reseedBootstrapNodesInterval
	}
}
