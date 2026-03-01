package porndb

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
)

type Requester interface {
	Request(ctx context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error)
}

type requester struct {
	resty *resty.Client
}

func newError(msg string) error {
	return fmt.Errorf("PornDB request failed: %s", msg)
}

var (
	ErrUnauthorized = newError("401 Unauthorized")
	ErrNotFound     = newError("404 Not Found")
)

func (r requester) Request(
	ctx context.Context,
	path string,
	queryParams map[string]string,
	result any,
) (*resty.Response, error) {
	res, err := r.resty.R().
		SetContext(ctx).
		SetQueryParams(queryParams).
		SetResult(&result).
		Get(path)
	if err == nil && !res.IsSuccess() {
		switch res.StatusCode() {
		case http.StatusUnauthorized:
			err = ErrUnauthorized
		case http.StatusNotFound:
			err = ErrNotFound
		default:
			err = newError(res.Status())
		}
	}

	return res, err
}
