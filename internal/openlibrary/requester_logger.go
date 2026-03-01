package openlibrary

import (
	"context"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

type requesterLogger struct {
	requester Requester
	logger    *zap.SugaredLogger
}

func (r requesterLogger) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
	res, err := r.requester.Request(ctx, path, queryParams, result)
	kvs := []interface{}{
		"path", path,
		"queryParams", queryParams,
	}

	if err != nil {
		r.logger.With(kvs...).Errorf("openlibrary request error: %s", err)
	} else {
		kvs = append(kvs,
			"status", res.StatusCode(),
			"duration", res.Request.TraceInfo().TotalTime,
		)
		r.logger.With(kvs...).Debug("openlibrary request completed")
	}

	return res, err
}
