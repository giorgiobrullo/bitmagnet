package igdb

import (
	"context"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

type requesterLogger struct {
	requester Requester
	logger    *zap.SugaredLogger
}

func (r requesterLogger) Request(ctx context.Context, path string, body string, result any) (*resty.Response, error) {
	res, err := r.requester.Request(ctx, path, body, result)
	kvs := []interface{}{
		"path", path,
	}

	if res != nil {
		kvs = append(kvs, "status", res.StatusCode(), "duration", res.Request.TraceInfo().TotalTime)
	}

	if err == nil {
		r.logger.Debugw("IGDB request completed", kvs...)
	} else {
		kvs = append(kvs, "error", err)
		r.logger.Errorw("IGDB request failed", kvs...)
	}

	return res, err
}
