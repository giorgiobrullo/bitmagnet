package googlebooks

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

func (r *requesterLazy) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
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
		return nil, errors.New("Google Books is disabled")
	}

	if config.APIKey == "" {
		return nil, errors.New("Google Books API key is required")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	sem := semaphore.NewWeighted(1)

	c := resty.New().
		SetBaseURL(config.BaseURL).
		SetRetryCount(2).
		SetRetryWaitTime(2 * time.Second).
		SetRetryMaxWaitTime(10 * time.Second).
		SetTimeout(15 * time.Second).
		EnableTrace().
		SetHeader("User-Agent", "bitmagnet/1.0 (https://github.com/bitmagnet-io/bitmagnet)")

	// Inject API key into every request.
	c.SetQueryParam("key", config.APIKey)

	c.AddRetryCondition(func(r *resty.Response, err error) bool {
		return r != nil && (r.StatusCode() == 429 || r.StatusCode() == 503)
	})

	return requesterLogger{
		requester: requester{resty: c, sem: sem, limiter: limiter},
		logger:    logger,
	}, nil
}
