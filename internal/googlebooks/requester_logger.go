package googlebooks

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
		r.logger.With(kvs...).Errorf("googlebooks request error: %s", err)
	} else {
		kvs = append(kvs,
			"status", res.StatusCode(),
			"duration", res.Request.TraceInfo().TotalTime,
		)
		r.logger.With(kvs...).Debug("googlebooks request completed")
	}

	return res, err
}
