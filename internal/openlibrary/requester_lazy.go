package openlibrary

import (
	"context"
	"sync"

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

func (r *requesterLazy) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
	r.once.Do(func() {
		limiter := rate.NewLimiter(rate.Every(r.config.RateLimit), r.config.RateLimitBurst)
		sem := semaphore.NewWeighted(1)

		c := resty.New().
			SetBaseURL(r.config.BaseURL).
			SetRetryCount(2).
			SetRetryWaitTime(2e9).
			SetRetryMaxWaitTime(10e9).
			SetTimeout(15e9).
			EnableTrace().
			SetHeader("User-Agent", "bitmagnet/1.0 (https://github.com/bitmagnet-io/bitmagnet)")

		c.OnBeforeRequest(func(_ *resty.Client, req *resty.Request) error {
			if err := sem.Acquire(req.Context(), 1); err != nil {
				return err
			}
			return limiter.Wait(req.Context())
		})

		c.OnAfterResponse(func(_ *resty.Client, _ *resty.Response) error {
			sem.Release(1)
			return nil
		})

		r.requester = requesterLogger{
			requester: requester{resty: c},
			logger:    r.logger,
		}
	})

	if r.err != nil {
		return nil, r.err
	}

	return r.requester.Request(ctx, path, queryParams, result)
}
