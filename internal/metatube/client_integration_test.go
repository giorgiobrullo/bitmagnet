//go:build integration

package metatube

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
)

func TestSearchJAV_Integration(t *testing.T) {
	logger := zap.NewNop().Sugar()
	c := &client{logger: logger}

	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	tests := []struct {
		code       string
		wantNumber string
	}{
		{"SONE-436", "SONE-436"},
		{"MIDV-123", "MIDV-123"},
		{"ABP-907", "ABP-907"},
	}

	for _, tt := range tests {
		t.Run(tt.code, func(t *testing.T) {
			result, err := c.SearchJAV(ctx, tt.code)
			require.NoError(t, err, "SearchJAV should not error for %s", tt.code)

			assert.NotEmpty(t, result.Title, "Title should not be empty")
			assert.NotEmpty(t, result.Provider, "Provider should not be empty")
			assert.Contains(t, result.Number, tt.wantNumber, "Number should contain the JAV code")

			t.Logf("Code: %s → Provider: %s, Title: %s, Actors: %v, Maker: %s, Date: %s",
				tt.code, result.Provider, result.Title, result.Actors, result.Maker, result.ReleaseDate)
		})
	}
}
