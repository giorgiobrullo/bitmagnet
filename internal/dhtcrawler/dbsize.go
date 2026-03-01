package dhtcrawler

import (
	"context"
	"time"
)

// monitorDBSize periodically checks the database size and stops the crawler
// if it exceeds the configured limit.
func (c *crawler) monitorDBSize(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case <-time.After(c.dbSizeCheckInterval):
			var size int64
			if err := c.dao.Torrent.WithContext(ctx).UnderlyingDB().Raw(
				"SELECT pg_database_size(current_database())",
			).Scan(&size).Error; err != nil {
				c.logger.Warnf("failed to check database size: %s", err)
				continue
			}

			sizeMB := size / (1024 * 1024)
			limitMB := int64(c.dbSizeLimit) / (1024 * 1024)

			if uint64(size) >= c.dbSizeLimit {
				c.logger.Warnf(
					"database size (%d MB) exceeds limit (%d MB), stopping crawler",
					sizeMB, limitMB,
				)
				close(c.stopped)
				return
			}

			c.logger.Debugf("database size: %d MB / %d MB limit", sizeMB, limitMB)
		}
	}
}
