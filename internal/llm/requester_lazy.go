package llm

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
	body any,
	result any,
) (*resty.Response, error) {
	r.once.Do(func() {
		r.requester, r.err = newRequester(r.config, r.logger)
	})

	if r.err != nil {
		return nil, r.err
	}

	return r.requester.Request(ctx, path, body, result)
}

func newRequester(config Config, logger *zap.SugaredLogger) (Requester, error) {
	if !config.Enabled {
		return nil, errors.New("LLM is disabled")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	concurrency := int64(config.Concurrency)
	if concurrency < 1 {
		concurrency = 2
	}
	sem := semaphore.NewWeighted(concurrency)

	r := requesterLogger{
		requester: requester{
			resty: resty.New().
				SetBaseURL(config.BaseURL).
				SetHeader("Content-Type", "application/json").
				SetRetryCount(2).
				SetRetryWaitTime(2 * time.Second).
				SetRetryMaxWaitTime(10 * time.Second).
				SetTimeout(config.Timeout).
				EnableTrace().
				SetLogger(logger).
				AddRetryCondition(func(r *resty.Response, err error) bool {
					return r != nil && (r.StatusCode() == 429 || r.StatusCode() == 503)
				}),
			sem:     sem,
			limiter: limiter,
		},
		logger: logger,
	}

	return r, nil
}
