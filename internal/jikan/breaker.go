package jikan

import (
	"sync"
	"time"
)

// breaker stops calls to Jikan for a while after it fails. Jikan is a free API that goes down
// for hours at a time; requests are serialised, so every call waiting out the client timeout
// holds up every classifier worker that reaches the anime fallback behind it.
type breaker struct {
	mu        sync.Mutex
	cooldown  time.Duration
	openUntil time.Time
	now       func() time.Time
}

func newBreaker(cooldown time.Duration) *breaker {
	return &breaker{cooldown: cooldown, now: time.Now}
}

func (b *breaker) isOpen() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	return b.now().Before(b.openUntil)
}

// trip opens the breaker and reports whether it was closed before.
func (b *breaker) trip() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	now := b.now()
	wasClosed := !now.Before(b.openUntil)
	b.openUntil = now.Add(b.cooldown)

	return wasClosed
}
