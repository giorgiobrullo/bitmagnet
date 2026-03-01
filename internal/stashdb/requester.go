package stashdb

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
)

type Requester interface {
	Request(ctx context.Context, body any, result any) (*resty.Response, error)
}

type requester struct {
	resty *resty.Client
}

func newError(msg string) error {
	return fmt.Errorf("StashDB request failed: %s", msg)
}

var (
	ErrUnauthorized = newError("401 Unauthorized")
)

func (r requester) Request(
	ctx context.Context,
	body any,
	result any,
) (*resty.Response, error) {
	res, err := r.resty.R().
		SetContext(ctx).
		SetBody(body).
		SetResult(&result).
		Post("")
	if err == nil && !res.IsSuccess() {
		switch res.StatusCode() {
		case http.StatusUnauthorized:
			err = ErrUnauthorized
		default:
			err = newError(res.Status())
		}
	}

	return res, err
}
