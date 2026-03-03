package anilist

import (
	"context"
	"errors"
	"strconv"
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

func (r *requesterLazy) Request(ctx context.Context, body any, result any) (*resty.Response, error) {
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
		return nil, errors.New("AniList is disabled")
	}

	limiter := rate.NewLimiter(rate.Every(config.RateLimit), config.RateLimitBurst)
	sem := semaphore.NewWeighted(1)

	c := resty.New().
		SetBaseURL(config.BaseURL).
		SetHeader("Content-Type", "application/json").
		SetHeader("Accept", "application/json").
		SetRetryCount(3).
		SetRetryWaitTime(2 * time.Second).
		SetRetryMaxWaitTime(65 * time.Second).
		SetTimeout(15 * time.Second).
		EnableTrace()

	c.AddRetryCondition(func(r *resty.Response, err error) bool {
		return r != nil && (r.StatusCode() == 429 || r.StatusCode() == 503)
	})

	// Respect AniList's Retry-After header on 429 responses.
	c.SetRetryAfter(func(_ *resty.Client, resp *resty.Response) (time.Duration, error) {
		if resp.StatusCode() == 429 {
			if ra := resp.Header().Get("Retry-After"); ra != "" {
				if secs, err := strconv.Atoi(ra); err == nil {
					logger.Infof("AniList rate limited, waiting %ds (Retry-After)", secs)
					return time.Duration(secs) * time.Second, nil
				}
			}
			// No header or unparseable — default to 60s (AniList's cooldown).
			logger.Info("AniList rate limited, waiting 60s (default cooldown)")
			return 60 * time.Second, nil
		}
		return 0, nil
	})

	return requesterLogger{
		requester: requester{resty: c, sem: sem, limiter: limiter},
		logger:    logger,
	}, nil
}
