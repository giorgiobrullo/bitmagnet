package httpserver

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/database/query"
	"github.com/bitmagnet-io/bitmagnet/internal/database/search"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/gin-gonic/gin"
)

type handler struct {
	search search.Search
}

type resultItem struct {
	Name            string  `json:"name"`
	InfoHash        string  `json:"infoHash"`
	MagnetURI       string  `json:"magnetUri"`
	Size            uint64  `json:"size"`
	Seeders         *uint   `json:"seeders"`
	Leechers        *uint   `json:"leechers"`
	ContentType     *string `json:"contentType,omitempty"`
	VideoResolution *string `json:"videoResolution,omitempty"`
	VideoSource     *string `json:"videoSource,omitempty"`
	VideoCodec      *string `json:"videoCodec,omitempty"`
}

func (h handler) handleIMDBSearch(c *gin.Context) {
	imdbID := c.Param("imdb_id")
	if !strings.HasPrefix(imdbID, "tt") {
		imdbID = "tt" + imdbID
	}

	limit := parseLimit(c)

	options := []query.Option{
		search.TorrentContentDefaultOption(),
		query.WithTotalCount(false),
		query.Limit(limit),
		query.Where(search.ContentIdentifierCriteria(model.ContentRef{
			Source: "imdb",
			ID:     imdbID,
		})),
	}

	h.executeSearch(c, options)
}

func (h handler) handleTMDBSearch(c *gin.Context) {
	tmdbID := c.Param("tmdb_id")
	contentTypeStr := c.Param("content_type")

	var ct model.ContentType
	switch contentTypeStr {
	case "movie":
		ct = model.ContentTypeMovie
	case "tv", "tvshow", "show":
		ct = model.ContentTypeTvShow
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": "content_type must be 'movie' or 'tv'"})
		return
	}

	limit := parseLimit(c)

	options := []query.Option{
		search.TorrentContentDefaultOption(),
		query.WithTotalCount(false),
		query.Limit(limit),
		query.Where(search.ContentCanonicalIdentifierCriteria(model.ContentRef{
			Type:   ct,
			Source: "tmdb",
			ID:     tmdbID,
		})),
	}

	h.executeSearch(c, options)
}

func (h handler) executeSearch(c *gin.Context, options []query.Option) {
	result, err := h.search.TorrentContent(c.Request.Context(), options...)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	items := make([]resultItem, 0, len(result.Items))
	for _, item := range result.Items {
		ri := resultItem{
			Name:      item.Torrent.Name,
			InfoHash:  item.Torrent.InfoHash.String(),
			MagnetURI: item.Torrent.MagnetURI(),
			Size:      uint64(item.Torrent.Size),
		}

		if s := item.Torrent.Seeders(); s.Valid {
			ri.Seeders = &s.Uint
		}
		if l := item.Torrent.Leechers(); l.Valid {
			ri.Leechers = &l.Uint
		}
		if item.ContentType.Valid {
			ct := string(item.ContentType.ContentType)
			ri.ContentType = &ct
		}
		if item.VideoResolution.Valid {
			vr := string(item.VideoResolution.VideoResolution)
			ri.VideoResolution = &vr
		}
		if item.VideoSource.Valid {
			vs := string(item.VideoSource.VideoSource)
			ri.VideoSource = &vs
		}
		if item.VideoCodec.Valid {
			vc := string(item.VideoCodec.VideoCodec)
			ri.VideoCodec = &vc
		}

		items = append(items, ri)
	}

	c.JSON(http.StatusOK, gin.H{
		"totalCount": len(items),
		"results":    items,
	})
}

func parseLimit(c *gin.Context) uint {
	limit := uint(50)
	if l := c.Query("limit"); l != "" {
		if parsed, err := strconv.ParseUint(l, 10, 32); err == nil && parsed > 0 {
			limit = uint(parsed)
			if limit > 500 {
				limit = 500
			}
		}
	}

	return limit
}
