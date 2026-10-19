package jikan

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestBreaker(t *testing.T) {
	t.Parallel()

	now := time.Date(2026, 1, 1, 0, 0, 0, 0, time.UTC)
	b := newBreaker(5 * time.Minute)
	b.now = func() time.Time { return now }

	assert.False(t, b.isOpen())
	assert.True(t, b.trip())
	assert.True(t, b.isOpen())

	now = now.Add(4 * time.Minute)
	assert.True(t, b.isOpen())
	assert.False(t, b.trip(), "tripping an open breaker extends it")

	now = now.Add(4 * time.Minute)
	assert.True(t, b.isOpen())

	now = now.Add(time.Minute)
	assert.False(t, b.isOpen())
	assert.True(t, b.trip())
}
