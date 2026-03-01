package porndb

import (
	"context"
	"errors"
	"sync"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/concurrency"
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
		return nil, errors.New("PornDB is disabled")
	}

	if config.APIKey == "" {
		return nil, errors.New("PornDB API key is required")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	sem := semaphore.NewWeighted(2)

	r := requesterLogger{
		requester: requesterFailFast{
			requester: requester{
				resty: resty.New().
					SetBaseURL(config.BaseURL).
					SetAuthToken(config.APIKey).
					SetHeader("Accept", "application/json").
					SetRetryCount(3).
					SetRetryWaitTime(2 * time.Second).
					SetRetryMaxWaitTime(20 * time.Second).
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
			isUnauthorized: &concurrency.AtomicValue[bool]{},
		},
		logger: logger,
	}

	return r, nil
}
