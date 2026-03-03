package deezer

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

type Requester interface {
	Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error)
}

type requester struct {
	resty   *resty.Client
	sem     *semaphore.Weighted
	limiter *rate.Limiter
}

func newError(msg string) error {
	return fmt.Errorf("Deezer request failed: %s", msg)
}

var (
	ErrNotFound    = newError("404 Not Found")
	ErrRateLimited = newError("429 Too Many Requests")
)

func (r requester) Request(
	ctx context.Context,
	path string,
	queryParams map[string]string,
	result any,
) (*resty.Response, error) {
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
		SetResult(&result).
		Get(path)
	if err == nil && !res.IsSuccess() {
		switch res.StatusCode() {
		case http.StatusNotFound:
			err = ErrNotFound
		case http.StatusTooManyRequests:
			err = ErrRateLimited
		default:
			err = newError(res.Status())
		}
	}

	return res, err
}
