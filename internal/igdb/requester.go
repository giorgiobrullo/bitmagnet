package igdb

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

type Requester interface {
	Request(ctx context.Context, path string, body string, result any) (*resty.Response, error)
}

type requester struct {
	resty   *resty.Client
	sem     *semaphore.Weighted
	limiter *rate.Limiter
}

var (
	ErrUnauthorized = fmt.Errorf("IGDB request failed: 401 Unauthorized")
	ErrRateLimited  = fmt.Errorf("IGDB request failed: rate limited")
)

func (r requester) Request(ctx context.Context, path string, body string, result any) (*resty.Response, error) {
	if err := r.sem.Acquire(ctx, 1); err != nil {
		return nil, err
	}
	defer r.sem.Release(1)
	if err := r.limiter.Wait(ctx); err != nil {
		return nil, err
	}

	res, err := r.resty.R().
		SetContext(ctx).
		SetBody(body).
		SetResult(result).
		Post(path)
	if err != nil {
		return nil, err
	}

	switch res.StatusCode() {
	case http.StatusOK:
		return res, nil
	case http.StatusUnauthorized:
		return nil, ErrUnauthorized
	case http.StatusTooManyRequests:
		return nil, ErrRateLimited
	default:
		return nil, fmt.Errorf("IGDB request failed with status %d: %s", res.StatusCode(), res.String())
	}
}
