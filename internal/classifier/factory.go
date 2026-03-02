package classifier

import (
	"fmt"

	"github.com/bitmagnet-io/bitmagnet/internal/anilist"
	"github.com/bitmagnet-io/bitmagnet/internal/comicvine"
	"github.com/bitmagnet-io/bitmagnet/internal/database/search"
	"github.com/bitmagnet-io/bitmagnet/internal/deezer"
	"github.com/bitmagnet-io/bitmagnet/internal/discogs"
	"github.com/bitmagnet-io/bitmagnet/internal/googlebooks"
	"github.com/bitmagnet-io/bitmagnet/internal/igdb"
	"github.com/bitmagnet-io/bitmagnet/internal/jikan"
	"github.com/bitmagnet-io/bitmagnet/internal/lazy"
	"github.com/bitmagnet-io/bitmagnet/internal/llm"
	"github.com/bitmagnet-io/bitmagnet/internal/musicbrainz"
	"github.com/bitmagnet-io/bitmagnet/internal/openlibrary"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
	"github.com/bitmagnet-io/bitmagnet/internal/stashdb"
	"github.com/bitmagnet-io/bitmagnet/internal/tmdb"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type Params struct {
	fx.In
	Config             Config
	TmdbConfig         tmdb.Config
	LlmConfig          llm.Config
	PorndbConfig       porndb.Config
	StashdbConfig      stashdb.Config
	DiscogsConfig      discogs.Config
	DeezerConfig       deezer.Config
	MusicbrainzConfig  musicbrainz.Config
	OpenlibraryConfig  openlibrary.Config
	ComicvineConfig    comicvine.Config
	IgdbConfig         igdb.Config
	AnilistConfig      anilist.Config
	JikanConfig        jikan.Config
	GooglebooksConfig  googlebooks.Config
	Search             lazy.Lazy[search.Search]
	TmdbClient         lazy.Lazy[tmdb.Client]
	LlmClient          lazy.Lazy[llm.Client]
	PorndbClient       lazy.Lazy[porndb.Client]
	StashdbClient      lazy.Lazy[stashdb.Client]
	DiscogsClient      lazy.Lazy[discogs.Client]
	DeezerClient       lazy.Lazy[deezer.Client]
	MusicbrainzClient  lazy.Lazy[musicbrainz.Client]
	OpenlibraryClient  lazy.Lazy[openlibrary.Client]
	ComicvineClient    lazy.Lazy[comicvine.Client]
	IgdbClient         lazy.Lazy[igdb.Client]
	AnilistClient      lazy.Lazy[anilist.Client]
	JikanClient        lazy.Lazy[jikan.Client]
	GooglebooksClient  lazy.Lazy[googlebooks.Client]
	Logger             *zap.SugaredLogger
}

type Result struct {
	fx.Out
	Compiler lazy.Lazy[Compiler]
	Source   lazy.Lazy[Source]
	Runner   lazy.Lazy[Runner]
}

func New(params Params) Result {
	lc := lazy.New(func() (Compiler, error) {
		s, err := params.Search.Get()
		if err != nil {
			return nil, err
		}

		tmdbClient, err := params.TmdbClient.Get()
		if err != nil {
			return nil, err
		}

		// LLM client is optional — gracefully nil if disabled or errored.
		var llmClient llm.Client
		if params.LlmConfig.Enabled {
			if c, llmErr := params.LlmClient.Get(); llmErr == nil {
				llmClient = c
			}
		}

		// PornDB client is optional — gracefully nil if disabled or errored.
		var porndbClient porndb.Client
		if params.PorndbConfig.Enabled {
			if c, porndbErr := params.PorndbClient.Get(); porndbErr == nil {
				porndbClient = c
			}
		}

		// StashDB client is optional — gracefully nil if disabled or errored.
		var stashdbClient stashdb.Client
		if params.StashdbConfig.Enabled {
			if c, stashdbErr := params.StashdbClient.Get(); stashdbErr == nil {
				stashdbClient = c
			}
		}

		// Discogs client is optional — gracefully nil if disabled or errored.
		var discogsClient discogs.Client
		if params.DiscogsConfig.Enabled {
			if c, dcErr := params.DiscogsClient.Get(); dcErr == nil {
				discogsClient = c
			}
		}

		// Deezer client is optional — gracefully nil if disabled or errored.
		var deezerClient deezer.Client
		if params.DeezerConfig.Enabled {
			if c, dzErr := params.DeezerClient.Get(); dzErr == nil {
				deezerClient = c
			}
		}

		// MusicBrainz client is optional — gracefully nil if disabled or errored.
		var musicbrainzClient musicbrainz.Client
		if params.MusicbrainzConfig.Enabled {
			if c, mbErr := params.MusicbrainzClient.Get(); mbErr == nil {
				musicbrainzClient = c
			}
		}

		// OpenLibrary client is optional — gracefully nil if disabled or errored.
		var openlibraryClient openlibrary.Client
		if params.OpenlibraryConfig.Enabled {
			if c, olErr := params.OpenlibraryClient.Get(); olErr == nil {
				openlibraryClient = c
			}
		}

		// Comic Vine client is optional — gracefully nil if disabled or errored.
		var comicvineClient comicvine.Client
		if params.ComicvineConfig.Enabled {
			if c, cvErr := params.ComicvineClient.Get(); cvErr == nil {
				comicvineClient = c
			}
		}

		// IGDB client is optional — gracefully nil if disabled or errored.
		var igdbClient igdb.Client
		if params.IgdbConfig.Enabled {
			if c, igdbErr := params.IgdbClient.Get(); igdbErr == nil {
				igdbClient = c
			}
		}

		// AniList client is optional — gracefully nil if disabled or errored.
		var anilistClient anilist.Client
		if params.AnilistConfig.Enabled {
			if c, alErr := params.AnilistClient.Get(); alErr == nil {
				anilistClient = c
			}
		}

		// Jikan client is optional — gracefully nil if disabled or errored.
		var jikanClient jikan.Client
		if params.JikanConfig.Enabled {
			if c, jkErr := params.JikanClient.Get(); jkErr == nil {
				jikanClient = c
			}
		}

		// Google Books client is optional — gracefully nil if disabled or errored.
		var googlebooksClient googlebooks.Client
		if params.GooglebooksConfig.Enabled {
			if c, gbErr := params.GooglebooksClient.Get(); gbErr == nil {
				googlebooksClient = c
			}
		}

		logger := zap.NewNop().Sugar()
		verbose := params.Config.Verbose
		if verbose == true {
			logger = params.Logger
		}

		return compiler{
			options: []compilerOption{
				compilerFeatures(defaultFeatures),
				celEnvOption,
			},
			dependencies: dependencies{
				search: localSearchSemaphore{
					search:    localSearch{s},
					semaphore: make(chan struct{}, 5),
				},
				tmdbClient:       tmdbClient,
				llmClient:        llmClient,
				llmMinConfidence: params.LlmConfig.MinConfidence,
				porndbClient:     porndbClient,
				stashdbClient:     stashdbClient,
				discogsClient:      discogsClient,
				deezerClient:       deezerClient,
				musicbrainzClient:  musicbrainzClient,
				openlibraryClient:  openlibraryClient,
				comicvineClient:    comicvineClient,
				igdbClient:         igdbClient,
				anilistClient:      anilistClient,
				jikanClient:        jikanClient,
				googlebooksClient:  googlebooksClient,
				_logger:            logger,
				logger:             logger,
			},
		}, nil
	})
	lsrc := lazy.New[Source](func() (Source, error) {
		src, err := newSourceProvider(params.Config, params.TmdbConfig, params.LlmConfig.Enabled, params.PorndbConfig.Enabled, params.StashdbConfig.Enabled, params.DiscogsConfig.Enabled, params.DeezerConfig.Enabled, params.MusicbrainzConfig.Enabled, params.OpenlibraryConfig.Enabled, params.ComicvineConfig.Enabled, params.IgdbConfig.Enabled, params.AnilistConfig.Enabled, params.JikanConfig.Enabled, params.GooglebooksConfig.Enabled).source()
		if err != nil {
			return Source{}, err
		}

		if _, ok := src.Workflows[params.Config.Workflow]; !ok {
			return Source{}, fmt.Errorf("default workflow '%s' not found", params.Config.Workflow)
		}

		return src, nil
	})

	return Result{
		Compiler: lc,
		Source:   lsrc,
		Runner: lazy.New(func() (Runner, error) {
			src, err := lsrc.Get()
			if err != nil {
				return nil, err
			}
			c, err := lc.Get()
			if err != nil {
				return nil, err
			}
			r, err := c.Compile(src)
			if err != nil {
				return nil, err
			}

			return runnerSemaphore{
				runner:    r,
				semaphore: make(chan struct{}, params.Config.Concurrency),
			}, nil
		}),
	}
}
