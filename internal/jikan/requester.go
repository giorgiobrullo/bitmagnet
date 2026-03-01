package jikan

import (
	"context"
	"fmt"

	"github.com/go-resty/resty/v2"
)

var (
	ErrNotFound    = fmt.Errorf("jikan: not found")
	ErrRateLimited = fmt.Errorf("jikan: rate limited")
)

type Requester interface {
	Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error)
}

type requester struct {
	resty *resty.Client
}

func (r requester) Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
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
		return nil, fmt.Errorf("jikan request failed with status %d", res.StatusCode())
	}
}
