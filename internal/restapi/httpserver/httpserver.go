package httpserver

import (
	"github.com/bitmagnet-io/bitmagnet/internal/database/search"
	"github.com/bitmagnet-io/bitmagnet/internal/httpserver"
	"github.com/bitmagnet-io/bitmagnet/internal/lazy"
	"github.com/gin-gonic/gin"
)

func New(lazySearch lazy.Lazy[search.Search]) httpserver.Option {
	return &builder{lazySearch: lazySearch}
}

type builder struct {
	lazySearch lazy.Lazy[search.Search]
}

func (*builder) Key() string {
	return "rest_api"
}

func (b *builder) Apply(r gin.IRouter) error {
	s, err := b.lazySearch.Get()
	if err != nil {
		return err
	}

	h := handler{search: s}
	r.GET("/api/v1/search/imdb/:imdb_id", h.handleIMDBSearch)
	r.GET("/api/v1/search/tmdb/:content_type/:tmdb_id", h.handleTMDBSearch)

	return nil
}
