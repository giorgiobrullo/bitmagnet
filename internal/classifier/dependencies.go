package classifier

import (
	"encoding/json"
	"regexp"

	"github.com/bitmagnet-io/bitmagnet/internal/anilist"
	"github.com/bitmagnet-io/bitmagnet/internal/comicvine"
	"github.com/bitmagnet-io/bitmagnet/internal/deezer"
	"github.com/bitmagnet-io/bitmagnet/internal/discogs"
	"github.com/bitmagnet-io/bitmagnet/internal/googlebooks"
	"github.com/bitmagnet-io/bitmagnet/internal/igdb"
	"github.com/bitmagnet-io/bitmagnet/internal/jikan"
	"github.com/bitmagnet-io/bitmagnet/internal/llm"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/musicbrainz"
	"github.com/bitmagnet-io/bitmagnet/internal/openlibrary"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
	"github.com/bitmagnet-io/bitmagnet/internal/stashdb"
	"github.com/bitmagnet-io/bitmagnet/internal/tmdb"
	"go.uber.org/zap"
)

type dependencies struct {
	search            LocalSearch
	tmdbClient        tmdb.Client
	llmClient         llm.Client
	llmMinConfidence  float64
	porndbClient      porndb.Client
	stashdbClient     stashdb.Client
	discogsClient      discogs.Client
	deezerClient       deezer.Client
	musicbrainzClient  musicbrainz.Client
	openlibraryClient  openlibrary.Client
	comicvineClient    comicvine.Client
	igdbClient         igdb.Client
	anilistClient      anilist.Client
	jikanClient        jikan.Client
	googlebooksClient  googlebooks.Client
	_logger            *zap.SugaredLogger
	logger            *zap.SugaredLogger
}

func (d *dependencies) CleanObj(o interface{}) map[string]any {
	var isEmptyString = regexp.MustCompile("^(?:[0\\s]*|0001-01-01T00:00:00Z)$")
	var m map[string]any
	jhint,_ := json.Marshal(o)
	json.Unmarshal(jhint, &m)
	for k,v := range m {
		if s, sOk := v.(string); sOk && isEmptyString.MatchString(s) {
			delete(m, k)
			continue
		}		
		if a, aOk := v.([]any); aOk && len(a) == 0 {
			delete(m, k)
			continue
		}
		if f, fOk := v.(float64); fOk && f == 0.0 {
			delete(m, k)
			continue
		}
		d, dOk := v.(model.Date)		
		if dOk && (d.Year == 0 || d.Month == 0 || d.Day == 0) {
			delete(m, k)
			continue
		}
		if v == nil {
			delete(m, k)
			continue
		}
	}
	return m
}