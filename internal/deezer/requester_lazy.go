package deezer

import (
	"context"
	"errors"
	"sync"
	"time"

	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

type requesterLazy struct {
	once      sync.Once
	config    Config
	logger    *zap.SugaredLogger
	err       error
	requester Requester
}

func (r *requesterLazy) Request(
	ctx context.Context,
	path string,
	queryParams map[string]string,
	result any,
) (*resty.Response, error) {
	r.once.Do(func() {
		r.requester, r.err = newRequester(r.config, r.logger)
	})

	if r.err != nil {
		return nil, r.err
	}

	return r.requester.Request(ctx, path, queryParams, result)
}

func newRequester(config Config, logger *zap.SugaredLogger) (Requester, error) {
	if !config.Enabled {
		return nil, errors.New("Deezer is disabled")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	sem := semaphore.NewWeighted(1)

	r := requesterLogger{
		requester: requester{
			resty: resty.New().
				SetBaseURL(config.BaseURL).
				SetHeader("Accept", "application/json").
				SetHeader("User-Agent", "bitmagnet/1.0 ( https://github.com/bitmagnet-io/bitmagnet )").
				SetRetryCount(2).
				SetRetryWaitTime(2 * time.Second).
				SetRetryMaxWaitTime(10 * time.Second).
				SetTimeout(10 * time.Second).
				EnableTrace().
				SetLogger(logger).
				OnBeforeRequest(func(c *resty.Client, r *resty.Request) error {
					reqCtx := r.Context()
					if err := sem.Acquire(reqCtx, 1); err != nil {
						return err
					}
					if err := limiter.Wait(reqCtx); err != nil {
						sem.Release(1)
						return err
					}
					return nil
				}).
				OnAfterResponse(func(c *resty.Client, r *resty.Response) error {
					sem.Release(1)
					return nil
				}),
		},
		logger: logger,
	}

	return r, nil
}
