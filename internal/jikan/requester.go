package jikan

import (
	"context"
	"errors"
	"fmt"

	"github.com/go-resty/resty/v2"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

var (
	ErrNotFound    = fmt.Errorf("jikan: not found")
	ErrRateLimited = fmt.Errorf("jikan: rate limited")
	// ErrUnavailable is returned without a request while the breaker is open after a failure.
	ErrUnavailable = errors.New("jikan: unavailable")
)

type Requester interface {
	Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error)
}

type requester struct {
	resty   *resty.Client
	sem     *semaphore.Weighted
	limiter *rate.Limiter
	breaker *breaker
}

func (r requester) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
	if err := r.sem.Acquire(ctx, 1); err != nil {
		return nil, err
	}
	defer r.sem.Release(1)
	// checked after the semaphore, so callers queued behind a failing request skip it too
	if r.breaker.isOpen() {
		return nil, ErrUnavailable
	}
	if err := r.limiter.Wait(ctx); err != nil {
		return nil, err
	}

	res, err := r.resty.R().
		SetContext(ctx).
		SetQueryParams(queryParams).
		SetResult(result).
		Get(path)
	if err == nil && res.StatusCode() >= 500 && res.StatusCode() != 503 {
		err = fmt.Errorf("jikan request failed with status %d", res.StatusCode())
	}
	if err != nil {
		if ctx.Err() == nil && r.breaker.trip() {
			err = fmt.Errorf("%w (pausing Jikan lookups for %s)", err, r.breaker.cooldown)
		}
		return nil, err
	}

	switch res.StatusCode() {
	case 200:
		return res, nil
	case 404:
		return nil, ErrNotFound
	case 429, 503:
		return nil, ErrRateLimited
	default:
		return nil, fmt.Errorf("jikan request failed with status %d", res.StatusCode())
	}
}
