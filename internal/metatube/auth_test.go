package metatube

import (
	"os"
	"testing"

	"go.uber.org/zap"
)

func TestLoginFC2PPVDB(t *testing.T) {
	email := os.Getenv("METATUBE_FC2PPVDB_EMAIL")
	password := os.Getenv("METATUBE_FC2PPVDB_PASSWORD")

	if email == "" || password == "" {
		t.Skip("METATUBE_FC2PPVDB_EMAIL and METATUBE_FC2PPVDB_PASSWORD must be set")
	}

	logger, _ := zap.NewDevelopment()
	sugar := logger.Sugar()

	// Clear cache to force fresh login
	os.Remove("/tmp/metatube-cookies/FC2PPVDB.json")

	xsrf, session, err := loginFC2PPVDB(email, password, sugar)
	if err != nil {
		t.Fatalf("loginFC2PPVDB failed: %v", err)
	}

	t.Logf("XSRF-TOKEN: %s...", xsrf[:min(20, len(xsrf))])
	t.Logf("Session: %s...", session[:min(20, len(session))])
}

func TestLoginFC2(t *testing.T) {
	email := os.Getenv("METATUBE_FC2_EMAIL")
	password := os.Getenv("METATUBE_FC2_PASSWORD")

	if email == "" || password == "" {
		t.Skip("METATUBE_FC2_EMAIL and METATUBE_FC2_PASSWORD must be set")
	}

	logger, _ := zap.NewDevelopment()
	sugar := logger.Sugar()

	// Clear cache to force fresh login
	os.Remove("/tmp/metatube-cookies/FC2.json")

	sessionID, err := loginFC2(email, password, sugar)
	if err != nil {
		t.Fatalf("loginFC2 failed: %v", err)
	}

	t.Logf("Session ID: %s...", sessionID[:min(20, len(sessionID))])
}
