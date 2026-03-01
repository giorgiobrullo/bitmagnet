package anilist

import (
	"context"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
)

type requesterLogger struct {
	requester Requester
	logger    *zap.SugaredLogger
}

func (r requesterLogger) Request(ctx context.Context, body any, result any) (*resty.Response, error) {
	res, err := r.requester.Request(ctx, body, result)
	kvs := []interface{}{"endpoint", "graphql"}

	if res != nil {
		kvs = append(kvs, "status", res.StatusCode(), "duration", res.Request.TraceInfo().TotalTime)
	}

	if err == nil {
		r.logger.Debugw("AniList request completed", kvs...)
	} else {
		kvs = append(kvs, "error", err)
		r.logger.Errorw("AniList request failed", kvs...)
	}

	return res, err
}
