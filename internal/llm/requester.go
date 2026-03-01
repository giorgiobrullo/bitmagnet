package llm

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-resty/resty/v2"
)

type Requester interface {
	Request(ctx context.Context, path string, body any, result any) (*resty.Response, error)
}

type requester struct {
	resty *resty.Client
}

func newError(msg string) error {
	return fmt.Errorf("LLM request failed: %s", msg)
}

func (r requester) Request(
	ctx context.Context,
	path string,
	body any,
	result any,
) (*resty.Response, error) {
	res, err := r.resty.R().
		SetContext(ctx).
		SetBody(body).
		SetResult(&result).
		Post(path)
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

var ErrUnauthorized = newError("401 Unauthorized")
