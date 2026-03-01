package httpserver

import (
	"github.com/bitmagnet-io/bitmagnet/internal/httpserver"
	"github.com/bitmagnet-io/bitmagnet/internal/lazy"
	"github.com/bitmagnet-io/bitmagnet/internal/torznab"
	"github.com/gin-gonic/gin"
)

func New(lazyClient lazy.Lazy[torznab.Client], config torznab.Config) httpserver.Option {
	return builder{
		lazyClient: lazyClient,
		config:     config,
	}
}

type builder struct {
	lazyClient lazy.Lazy[torznab.Client]
	config     torznab.Config
}

func (builder) Key() string {
	return "torznab"
}

func (b builder) Apply(r gin.IRouter) error {
	client, err := b.lazyClient.Get()
	if err != nil {
		return err
	}

	h := handler{
		config: b.config,
		client: client,
	}
	r.GET("/torznab/*any", h.handleRequest)

	return nil
}
