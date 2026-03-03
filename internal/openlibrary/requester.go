package openlibrary

import (
	"context"
	"errors"
	"fmt"

	"github.com/go-resty/resty/v2"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

var (
	ErrNotFound    = errors.New("not found")
	ErrRateLimited = errors.New("rate limited")
)

type Requester interface {
	Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error)
}

type requester struct {
	resty   *resty.Client
	sem     *semaphore.Weighted
	limiter *rate.Limiter
}

func (r requester) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
	if err := r.sem.Acquire(ctx, 1); err != nil {
		return nil, err
	}
	defer r.sem.Release(1)
	if err := r.limiter.Wait(ctx); err != nil {
		return nil, err
	}

	res, err := r.resty.R().
		SetContext(ctx).
		SetQueryParams(queryParams).
		SetResult(result).
		Get(path)
	if err != nil {
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
		return nil, fmt.Errorf("openlibrary request failed with status %d", res.StatusCode())
	}
}
