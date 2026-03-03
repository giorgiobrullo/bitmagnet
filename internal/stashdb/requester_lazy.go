package stashdb

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
	body any,
	result any,
) (*resty.Response, error) {
	r.once.Do(func() {
		r.requester, r.err = newRequester(r.config, r.logger)
	})

	if r.err != nil {
		return nil, r.err
	}

	return r.requester.Request(ctx, body, result)
}

func newRequester(config Config, logger *zap.SugaredLogger) (Requester, error) {
	if !config.Enabled {
		return nil, errors.New("StashDB is disabled")
	}

	if config.APIKey == "" {
		return nil, errors.New("StashDB API key is required")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	sem := semaphore.NewWeighted(2)

	r := requesterLogger{
		requester: requesterFailFast{
			requester: requester{
				resty: resty.New().
					SetBaseURL(config.BaseURL).
					SetHeader("ApiKey", config.APIKey).
					SetHeader("Content-Type", "application/json").
					SetRetryCount(3).
					SetRetryWaitTime(2 * time.Second).
					SetRetryMaxWaitTime(20 * time.Second).
					SetTimeout(10 * time.Second).
					EnableTrace().
					SetLogger(logger).
					AddRetryCondition(func(r *resty.Response, err error) bool {
						return r != nil && (r.StatusCode() == 429 || r.StatusCode() == 503)
					}),
				sem:     sem,
				limiter: limiter,
			},
			isUnauthorized: &concurrency.AtomicValue[bool]{},
		},
		logger: logger,
	}

	return r, nil
}
