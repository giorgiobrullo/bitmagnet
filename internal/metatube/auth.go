package metatube

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/cookiejar"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"go.uber.org/zap"
)

// cachedCookies represents persisted session cookies with expiry info.
type cachedCookies struct {
	Provider   string            `json:"provider"`
	Cookies    map[string]string `json:"cookies"`
	ObtainedAt time.Time         `json:"obtained_at"`
	ExpiresAt  time.Time         `json:"expires_at"`
}

const (
	fc2CookieCacheTTL      = 7 * 24 * time.Hour  // FC2 sessions last days/weeks
	fc2ppvdbCookieCacheTTL = 30 * 24 * time.Hour // Laravel remember-me lasts months
	cookieCacheDir         = "/tmp/metatube-cookies"
	httpTimeout            = 30 * time.Second
	userAgent              = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0"
)

var csrfTokenRe = regexp.MustCompile(`name="_token"\s+value="([^"]+)"`)

// loadCachedCookies loads cookies from the cache file if they haven't expired.
func loadCachedCookies(provider string) (map[string]string, bool) {
	path := filepath.Join(cookieCacheDir, provider+".json")
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, false
	}
	var cached cachedCookies
	if err := json.Unmarshal(data, &cached); err != nil {
		return nil, false
	}
	if time.Now().After(cached.ExpiresAt) {
		return nil, false
	}
	return cached.Cookies, true
}

// saveCachedCookies persists cookies to a cache file.
func saveCachedCookies(provider string, cookies map[string]string, ttl time.Duration) {
	_ = os.MkdirAll(cookieCacheDir, 0700)
	cached := cachedCookies{
		Provider:   provider,
		Cookies:    cookies,
		ObtainedAt: time.Now(),
		ExpiresAt:  time.Now().Add(ttl),
	}
	data, err := json.Marshal(cached)
	if err != nil {
		return
	}
	_ = os.WriteFile(filepath.Join(cookieCacheDir, provider+".json"), data, 0600)
}

func newHTTPClient() *http.Client {
	jar, _ := cookiejar.New(nil)
	return &http.Client{
		Jar:     jar,
		Timeout: httpTimeout,
	}
}

// loginFC2 obtains an authenticated FC2 session cookie.
// FC2 article pages require login and are behind Cloudflare, so we use a
// Camoufox browser service (if available) to perform the login.
// Falls back to a basic unauthenticated session from visiting the homepage.
func loginFC2(email, password string, logger *zap.SugaredLogger) (string, error) {
	// Check cache first
	if cookies, ok := loadCachedCookies("FC2"); ok {
		if sid, exists := cookies["session_id"]; exists {
			logger.Info("metatube: using cached FC2 session")
			return sid, nil
		}
	}

	// Try Camoufox browser login (handles Cloudflare + reCAPTCHA)
	if camoufoxURL := os.Getenv("CAMOUFOX_URL"); camoufoxURL != "" {
		logger.Info("metatube: logging into FC2 via Camoufox...")
		sid, err := loginFC2ViaCamoufox(camoufoxURL, email, password)
		if err == nil {
			logger.Info("metatube: FC2 login successful via Camoufox")
			saveCachedCookies("FC2", map[string]string{"session_id": sid}, fc2CookieCacheTTL)
			return sid, nil
		}
		logger.Warnw("metatube: Camoufox FC2 login failed, falling back to basic session", "error", err)
	}

	// Fallback: get a basic (unauthenticated) session from visiting the homepage
	logger.Info("metatube: obtaining basic FC2 session...")
	client := newHTTPClient()

	req, err := http.NewRequest("GET", "https://adult.contents.fc2.com/", nil)
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("User-Agent", userAgent)

	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to fetch FC2: %w", err)
	}
	defer resp.Body.Close()

	u, _ := url.Parse("https://adult.contents.fc2.com/")
	for _, c := range client.Jar.Cookies(u) {
		if c.Name == "CONTENTS_FC2_PHPSESSID" {
			logger.Info("metatube: FC2 basic session obtained (article pages may not work)")
			saveCachedCookies("FC2", map[string]string{"session_id": c.Value}, fc2CookieCacheTTL)
			return c.Value, nil
		}
	}

	return "", fmt.Errorf("FC2 did not return CONTENTS_FC2_PHPSESSID cookie")
}

// loginFC2ViaCamoufox calls the Camoufox auth HTTP API to perform browser-based
// FC2 login (solves Cloudflare challenge + submits login form).
func loginFC2ViaCamoufox(camoufoxURL, email, password string) (string, error) {
	reqURL := fmt.Sprintf("%s/fc2-login?email=%s&password=%s",
		camoufoxURL, url.QueryEscape(email), url.QueryEscape(password))

	client := &http.Client{Timeout: 120 * time.Second} // Browser login takes time
	resp, err := client.Get(reqURL)
	if err != nil {
		return "", fmt.Errorf("camoufox request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read camoufox response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("camoufox returned %d: %s", resp.StatusCode, string(body))
	}

	var result struct {
		SessionID string `json:"session_id"`
		Error     string `json:"error"`
	}
	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("failed to parse camoufox response: %w", err)
	}

	if result.Error != "" {
		return "", fmt.Errorf("camoufox error: %s", result.Error)
	}

	if result.SessionID == "" {
		return "", fmt.Errorf("camoufox returned empty session_id")
	}

	return result.SessionID, nil
}

// loginFC2PPVDB performs HTTP login to FC2PPVDB and returns session cookies.
// FC2PPVDB uses Laravel with Turnstile on the frontend, but doesn't validate
// the Turnstile token server-side, so a direct POST works.
func loginFC2PPVDB(email, password string, logger *zap.SugaredLogger) (xsrfToken, session string, err error) {
	// Check cache first
	if cookies, ok := loadCachedCookies("FC2PPVDB"); ok {
		if xsrf, ok1 := cookies["xsrf_token"]; ok1 {
			if sess, ok2 := cookies["session"]; ok2 {
				logger.Info("metatube: using cached FC2PPVDB session")
				return xsrf, sess, nil
			}
		}
	}

	logger.Info("metatube: logging into FC2PPVDB...")
	client := newHTTPClient()

	// Step 1: GET /login to obtain CSRF token
	req, err := http.NewRequest("GET", "https://fc2ppvdb.com/login", nil)
	if err != nil {
		return "", "", fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("User-Agent", userAgent)

	resp, err := client.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("failed to fetch FC2PPVDB login page: %w", err)
	}
	body, err := io.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		return "", "", fmt.Errorf("failed to read login page: %w", err)
	}

	matches := csrfTokenRe.FindSubmatch(body)
	if matches == nil {
		return "", "", fmt.Errorf("FC2PPVDB CSRF token not found on login page")
	}
	csrfToken := string(matches[1])

	// Step 2: POST /login with credentials
	formData := url.Values{
		"_token":   {csrfToken},
		"email":    {email},
		"password": {password},
		"remember": {"on"},
	}

	req, err = http.NewRequest("POST", "https://fc2ppvdb.com/login", strings.NewReader(formData.Encode()))
	if err != nil {
		return "", "", fmt.Errorf("failed to create login request: %w", err)
	}
	req.Header.Set("User-Agent", userAgent)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err = client.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("FC2PPVDB login request failed: %w", err)
	}
	resp.Body.Close()

	// Extract session cookies
	u, _ := url.Parse("https://fc2ppvdb.com/")
	for _, c := range client.Jar.Cookies(u) {
		switch c.Name {
		case "XSRF-TOKEN":
			xsrfToken = c.Value
		case "fc2ppvdb_session":
			session = c.Value
		}
	}

	if xsrfToken == "" || session == "" {
		return "", "", fmt.Errorf("FC2PPVDB login failed: missing session cookies (got xsrf=%v, session=%v)", xsrfToken != "", session != "")
	}

	logger.Info("metatube: FC2PPVDB login successful")
	saveCachedCookies("FC2PPVDB", map[string]string{
		"xsrf_token": xsrfToken,
		"session":    session,
	}, fc2ppvdbCookieCacheTTL)

	return xsrfToken, session, nil
}
