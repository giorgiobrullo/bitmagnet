package igdb

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"sync"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/concurrency"
	"github.com/go-resty/resty/v2"
	"go.uber.org/zap"
	"golang.org/x/sync/semaphore"
	"golang.org/x/time/rate"
)

type tokenResponse struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
	TokenType   string `json:"token_type"`
}

type requesterLazy struct {
	once      sync.Once
	config    Config
	logger    *zap.SugaredLogger
	err       error
	requester Requester

	tokenMu     sync.Mutex
	accessToken string
	tokenExpiry time.Time
}

func (r *requesterLazy) Request(ctx context.Context, path string, body string, result any) (*resty.Response, error) {
	r.once.Do(func() {
		r.requester, r.err = r.newRequester()
	})

	if r.err != nil {
		return nil, r.err
	}

	return r.requester.Request(ctx, path, body, result)
}

func (r *requesterLazy) newRequester() (Requester, error) {
	if !r.config.Enabled {
		return nil, errors.New("IGDB is disabled")
	}

	if r.config.ClientID == "" || r.config.ClientSecret == "" {
		return nil, errors.New("IGDB client ID and secret are required")
	}

	// Fetch initial token.
	if err := r.refreshToken(); err != nil {
		return nil, fmt.Errorf("IGDB initial token fetch failed: %w", err)
	}

	limiter := rate.NewLimiter(rate.Every(r.config.RateLimit), r.config.RateLimitBurst)
	sem := semaphore.NewWeighted(2)

	c := resty.New().
		SetBaseURL(r.config.BaseURL).
		SetHeader("Content-Type", "text/plain").
		SetRetryCount(2).
		SetRetryWaitTime(2 * time.Second).
		SetRetryMaxWaitTime(10 * time.Second).
		SetTimeout(15 * time.Second).
		EnableTrace()

	c.OnBeforeRequest(func(_ *resty.Client, req *resty.Request) error {
		r.tokenMu.Lock()
		token := r.accessToken
		r.tokenMu.Unlock()

		req.SetHeader("Client-ID", r.config.ClientID)
		req.SetHeader("Authorization", "Bearer "+token)
		return nil
	})

	c.OnAfterResponse(func(_ *resty.Client, resp *resty.Response) error {
		// Auto-refresh token on 401.
		if resp.StatusCode() == 401 {
			r.logger.Info("IGDB token expired, refreshing...")
			if err := r.refreshToken(); err != nil {
				r.logger.Errorf("IGDB token refresh failed: %s", err)
			}
		}
		return nil
	})

	c.AddRetryCondition(func(r *resty.Response, err error) bool {
		return r != nil && (r.StatusCode() == 429 || r.StatusCode() == 503)
	})

	return requesterLogger{
		requester: requesterFailFast{
			requester:      requester{resty: c, sem: sem, limiter: limiter},
			isUnauthorized: &concurrency.AtomicValue[bool]{},
		},
		logger: r.logger,
	}, nil
}

func (r *requesterLazy) refreshToken() error {
	r.tokenMu.Lock()
	defer r.tokenMu.Unlock()

	// Skip if token is still valid (with 5-minute buffer).
	if r.accessToken != "" && time.Now().Before(r.tokenExpiry.Add(-5*time.Minute)) {
		return nil
	}

	resp, err := resty.New().R().
		SetQueryParams(map[string]string{
			"client_id":     r.config.ClientID,
			"client_secret": r.config.ClientSecret,
			"grant_type":    "client_credentials",
		}).
		Post("https://id.twitch.tv/oauth2/token")
	if err != nil {
		return fmt.Errorf("token request failed: %w", err)
	}

	if resp.StatusCode() != 200 {
		return fmt.Errorf("token request returned status %d: %s", resp.StatusCode(), resp.String())
	}

	var tokenResp tokenResponse
	if err := json.Unmarshal(resp.Body(), &tokenResp); err != nil {
		return fmt.Errorf("failed to parse token response: %w", err)
	}

	r.accessToken = tokenResp.AccessToken
	r.tokenExpiry = time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Second)
	r.logger.Infof("IGDB token refreshed, expires in %d seconds", tokenResp.ExpiresIn)

	return nil
}
