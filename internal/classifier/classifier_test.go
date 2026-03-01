package classifier

import (
	"context"
	"fmt"
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	classifier_mocks "github.com/bitmagnet-io/bitmagnet/internal/classifier/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/comicvine"
	comicvine_mocks "github.com/bitmagnet-io/bitmagnet/internal/comicvine/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/llm"
	llm_mocks "github.com/bitmagnet-io/bitmagnet/internal/llm/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/musicbrainz"
	musicbrainz_mocks "github.com/bitmagnet-io/bitmagnet/internal/musicbrainz/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/openlibrary"
	openlibrary_mocks "github.com/bitmagnet-io/bitmagnet/internal/openlibrary/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/porndb"
	porndb_mocks "github.com/bitmagnet-io/bitmagnet/internal/porndb/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/stashdb"
	stashdb_mocks "github.com/bitmagnet-io/bitmagnet/internal/stashdb/mocks"
	"github.com/bitmagnet-io/bitmagnet/internal/tmdb"
	tmdb_mocks "github.com/bitmagnet-io/bitmagnet/internal/tmdb/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"go.uber.org/zap"
)

func TestClassifier(t *testing.T) {
	t.Parallel()

	matchContext := mock.MatchedBy(func(ctx any) bool {
		_, ok := ctx.(context.Context)
		return ok
	})

	testCases := []struct {
		torrent      model.Torrent
		flags        Flags
		prepareMocks func(mocks testClassifierMocks)
		expected     classification.Result
		expectedErr  error
	}{
		// --- Original movie/xxx tests ---
		{
			torrent: model.Torrent{
				Name:        "The Regular Movie (2000).mkv",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mkv"),
				Size:        1000000000,
			},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeMovie,
					"The Regular Movie",
					model.Year(2000),
				).
					Return(model.Content{}, classification.ErrUnmatched)
				mocks.tmdbClient.On(
					"SearchMovie",
					matchContext,
					tmdb.SearchMovieRequest{
						Query:        "The Regular Movie",
						Year:         2000,
						IncludeAdult: true,
					},
				).
					Return(tmdb.SearchMovieResponse{}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeMovie),
					BaseTitle:   model.NewNullString("The Regular Movie"),
					Date: model.Date{
						Year: 2000,
					},
				},
			},
		},
		{
			torrent: model.Torrent{
				Name:        "The Regular Local Movie (2000).mkv",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mkv"),
				Size:        1000000000,
			},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeMovie,
					"The Regular Local Movie",
					model.Year(2000),
				).
					Return(model.Content{
						Type:        model.ContentTypeMovie,
						Source:      "local",
						ID:          "123",
						Title:       "The Regular Local Movie",
						ReleaseYear: 2000,
					}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeMovie),
					BaseTitle:   model.NewNullString("The Regular Local Movie"),
					Date: model.Date{
						Year: 2000,
					},
				},
				Content: &model.Content{
					Type:        model.ContentTypeMovie,
					Source:      "local",
					ID:          "123",
					Title:       "The Regular Local Movie",
					ReleaseYear: 2000,
				},
			},
		},
		{
			torrent: model.Torrent{
				Name:        "The Regular TMDB Movie (2000).mkv",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mkv"),
				Size:        1000000000,
			},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeMovie,
					"The Regular TMDB Movie",
					model.Year(2000),
				).
					Return(model.Content{}, classification.ErrUnmatched)
				mocks.tmdbClient.On(
					"SearchMovie",
					matchContext,
					tmdb.SearchMovieRequest{
						Query:        "The Regular TMDB Movie",
						Year:         2000,
						IncludeAdult: true,
					},
				).
					Return(tmdb.SearchMovieResponse{
						Results: []tmdb.SearchMovieResult{
							{
								ID:          123,
								Title:       "The Regular TMDB Movie",
								ReleaseDate: "2000-01-01",
							},
						},
					}, nil)
				mocks.tmdbClient.On(
					"MovieDetails",
					matchContext,
					tmdb.MovieDetailsRequest{
						ID: 123,
					},
				).
					Return(tmdb.MovieDetailsResponse{
						ID:            123,
						Title:         "The Regular TMDB Movie",
						OriginalTitle: "The Regular TMDB Movie Original",
						ReleaseDate:   "2000-01-01",
					}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeMovie),
					BaseTitle:   model.NewNullString("The Regular TMDB Movie"),
					Date: model.Date{
						Year: 2000,
					},
				},
				Content: &model.Content{
					Type:   model.ContentTypeMovie,
					Source: "tmdb",
					ID:     "123",
					Title:  "The Regular TMDB Movie",
					ReleaseDate: model.Date{
						Year:  2000,
						Month: 1,
						Day:   1,
					},
					ReleaseYear:   2000,
					Adult:         model.NewNullBool(false),
					OriginalTitle: model.NewNullString("The Regular TMDB Movie Original"),
					Popularity:    model.NewNullFloat32(0),
					VoteAverage:   model.NewNullFloat32(0),
					VoteCount:     model.NewNullUint(0),
				},
			},
		},
		{
			torrent: model.Torrent{
				Name:        "The XXX Movie 1080p.mkv",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mkv"),
				Size:        1000000000,
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType:     model.NewNullContentType(model.ContentTypeXxx),
					VideoResolution: model.NewNullVideoResolution(model.VideoResolutionV1080p),
				},
			},
		},
		// --- LLM classifier tests ---
		// LLM: classify ambiguous Chinese torrent as tv_show
		{
			torrent: model.Torrent{
				Name:        "一人之下 第一季 全24集 1080P",
				FilesStatus: model.FilesStatusMulti,
				Size:        5000000000,
				Files: []model.TorrentFile{
					{Path: "一人之下/S01E01.mkv", Extension: model.NewNullString("mkv"), Size: 200000000},
					{Path: "一人之下/S01E02.mkv", Extension: model.NewNullString("mkv"), Size: 200000000},
				},
			},
			flags: Flags{"llm_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.llmClient.On(
					"Classify",
					matchContext,
					llm.ClassifyInput{
						Name: "一人之下 第一季 全24集 1080P",
						Files: []llm.FileInfo{
							{Path: "一人之下/S01E01.mkv", Extension: "mkv", Size: 200000000},
							{Path: "一人之下/S01E02.mkv", Extension: "mkv", Size: 200000000},
						},
					},
				).Return(llm.ClassifyResult{
					Type:       "tv_show",
					Title:      "Hitori no Shita: The Outcast",
					Year:       2016,
					Confidence: 0.95,
				}, nil)
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeTvShow,
					"Hitori no Shita: The Outcast",
					model.Year(2016),
				).
					Return(model.Content{}, classification.ErrUnmatched)
				mocks.tmdbClient.On(
					"SearchTv",
					matchContext,
					tmdb.SearchTvRequest{
						Query:            "Hitori no Shita: The Outcast",
						IncludeAdult:     true,
						FirstAirDateYear: 2016,
					},
				).
					Return(tmdb.SearchTvResponse{}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeTvShow),
					BaseTitle:   model.NewNullString("Hitori no Shita: The Outcast"),
					Date: model.Date{
						Year: 2016,
					},
				},
			},
		},
		// LLM: low confidence is rejected, torrent stays unknown
		{
			torrent: model.Torrent{
				Name:        "ambiguous_content_no_extension",
				FilesStatus: model.FilesStatusSingle,
				Size:        500000000,
			},
			flags: Flags{"llm_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.llmClient.On(
					"Classify",
					matchContext,
					mock.Anything,
				).Return(llm.ClassifyResult{
					Type:       "movie",
					Title:      "Ambiguous Content",
					Year:       2025,
					Confidence: 0.3,
				}, nil)
			},
			expected: classification.Result{},
		},
		// --- PornDB: xxx with year → parse_video_content sets BaseTitle → PornDB search ---
		{
			torrent: model.Torrent{
				Name:        "Hardcore Scene Title (2023) 1080p.mp4",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mp4"),
				Size:        2000000000,
			},
			flags: Flags{"porndb_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeXxx,
					"Hardcore Scene Title",
					model.Year(2023),
				).Return(model.Content{}, classification.ErrUnmatched)
				mocks.porndbClient.On(
					"SearchScenes",
					matchContext,
					porndb.SearchScenesRequest{
						Query: "Hardcore Scene Title",
					},
				).Return(porndb.SearchScenesResponse{
					Data: []porndb.SceneResult{
						{
							ID:    "abc-42",
							Title: "Hardcore Scene Title",
							Date:  "2023-05-10",
						},
					},
				}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType:     model.NewNullContentType(model.ContentTypeXxx),
					BaseTitle:       model.NewNullString("Hardcore Scene Title"),
					VideoResolution: model.NewNullVideoResolution(model.VideoResolutionV1080p),
					Date: model.Date{
						Year: 2023,
					},
				},
				Content: &model.Content{
					Type:   model.ContentTypeXxx,
					Source: "porndb",
					ID:     "abc-42",
					Title:  "Hardcore Scene Title",
					ReleaseDate: model.Date{
						Year:  2023,
						Month: 5,
						Day:   10,
					},
					ReleaseYear: 2023,
					Adult:       model.NewNullBool(true),
				},
			},
		},
		// --- StashDB: xxx with year → parse_video_content sets BaseTitle → StashDB search ---
		{
			torrent: model.Torrent{
				Name:        "Erotic Film Title (2022) 720p.mp4",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("mp4"),
				Size:        2000000000,
			},
			flags: Flags{"stashdb_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeXxx,
					"Erotic Film Title",
					model.Year(2022),
				).Return(model.Content{}, classification.ErrUnmatched)
				mocks.stashdbClient.On(
					"SearchScenes",
					matchContext,
					stashdb.SearchScenesRequest{
						Term: "Erotic Film Title",
					},
				).Return(stashdb.SearchScenesResponse{
					Scenes: []stashdb.SceneResult{
						{
							ID:          "stash-99",
							Title:       "Erotic Film Title",
							ReleaseDate: "2022-03-15",
							Duration:    1800,
						},
					},
				}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType:     model.NewNullContentType(model.ContentTypeXxx),
					BaseTitle:       model.NewNullString("Erotic Film Title"),
					VideoResolution: model.NewNullVideoResolution(model.VideoResolutionV720p),
					Date: model.Date{
						Year: 2022,
					},
				},
				Content: &model.Content{
					Type:   model.ContentTypeXxx,
					Source: "stashdb",
					ID:     "stash-99",
					Title:  "Erotic Film Title",
					ReleaseDate: model.Date{
						Year:  2022,
						Month: 3,
						Day:   15,
					},
					ReleaseYear: 2022,
					Adult:       model.NewNullBool(true),
					Runtime:     model.NullUint16{Uint16: 1800, Valid: true},
					Attributes: []model.ContentAttribute{
						{Source: "stashdb", Key: "id", Value: "stash-99"},
					},
				},
			},
		},
		// --- MusicBrainz: LLM → music → MusicBrainz search ---
		// (Non-video types need LLM to set BaseTitle since parse_video_content doesn't run)
		{
			torrent: model.Torrent{
				Name:        "Radiohead OK Computer 1997",
				FilesStatus: model.FilesStatusSingle,
				Size:        500000000,
			},
			flags: Flags{"llm_enabled": true, "musicbrainz_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.llmClient.On(
					"Classify",
					matchContext,
					mock.Anything,
				).Return(llm.ClassifyResult{
					Type:       "music",
					Title:      "Radiohead - OK Computer",
					Year:       1997,
					Confidence: 0.95,
				}, nil)
				// Local search fails → falls through to MusicBrainz
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeMusic,
					"Radiohead - OK Computer",
					model.Year(1997),
				).Return(model.Content{}, classification.ErrUnmatched)
				mocks.musicbrainzClient.On(
					"SearchRelease",
					matchContext,
					musicbrainz.SearchReleaseRequest{
						Query: "Radiohead - OK Computer",
						Limit: 10,
					},
				).Return(musicbrainz.SearchReleaseResponse{
					Releases: []musicbrainz.ReleaseResult{
						{
							ID:    "abc-123",
							Title: "OK Computer",
							Date:  "1997-06-16",
							ArtistCredit: []musicbrainz.ArtistCredit{
								{Name: "Radiohead"},
							},
						},
					},
				}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeMusic),
					BaseTitle:   model.NewNullString("Radiohead - OK Computer"),
					Date: model.Date{
						Year: 1997,
					},
				},
				Content: &model.Content{
					Type:   model.ContentTypeMusic,
					Source: "musicbrainz",
					ID:     "abc-123",
					Title:  "Radiohead - OK Computer",
					ReleaseDate: model.Date{
						Year:  1997,
						Month: 6,
						Day:   16,
					},
					ReleaseYear: 1997,
					Attributes: []model.ContentAttribute{
						{Source: "musicbrainz", Key: "id", Value: "abc-123"},
						{Source: "musicbrainz", Key: "artist", Value: "Radiohead"},
					},
				},
			},
		},
		// --- OpenLibrary: LLM → ebook → OpenLibrary search ---
		{
			torrent: model.Torrent{
				Name:        "Frank Herbert Dune 1965",
				FilesStatus: model.FilesStatusSingle,
				Size:        5000000,
			},
			flags: Flags{"llm_enabled": true, "openlibrary_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.llmClient.On(
					"Classify",
					matchContext,
					mock.Anything,
				).Return(llm.ClassifyResult{
					Type:       "ebook",
					Title:      "Frank Herbert - Dune",
					Year:       1965,
					Confidence: 0.9,
				}, nil)
				// Local search fails → falls through to OpenLibrary
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeEbook,
					"Frank Herbert - Dune",
					model.Year(1965),
				).Return(model.Content{}, classification.ErrUnmatched)
				mocks.openlibraryClient.On(
					"SearchBooks",
					matchContext,
					openlibrary.SearchBooksRequest{
						Query: "Frank Herbert - Dune",
						Limit: 10,
					},
				).Return(openlibrary.SearchBooksResponse{
					Docs: []openlibrary.DocResult{
						{
							Key:              "/works/OL893415W",
							Title:            "Dune",
							AuthorName:       []string{"Frank Herbert"},
							FirstPublishYear: 1965,
							CoverI:           11481354,
							ISBN:             []string{"978-0441172719"},
							NumberOfPages:    592,
							Language:         []string{"eng"},
						},
					},
				}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeEbook),
					BaseTitle:   model.NewNullString("Frank Herbert - Dune"),
					Date: model.Date{
						Year: 1965,
					},
				},
				Content: &model.Content{
					Type:        model.ContentTypeEbook,
					Source:      "openlibrary",
					ID:          "OL893415W",
					Title:       "Frank Herbert - Dune",
					ReleaseYear: 1965,
					Attributes: []model.ContentAttribute{
						{Source: "openlibrary", Key: "id", Value: "OL893415W"},
						{Source: "openlibrary", Key: "author", Value: "Frank Herbert"},
						{Source: "openlibrary", Key: "cover_url", Value: "https://covers.openlibrary.org/b/id/11481354-L.jpg"},
						{Source: "openlibrary", Key: "isbn", Value: "978-0441172719"},
						{Source: "openlibrary", Key: "pages", Value: "592"},
						{Source: "openlibrary", Key: "language", Value: "eng"},
					},
				},
			},
		},
		// --- Comic Vine: LLM → comic → Comic Vine search ---
		{
			torrent: model.Torrent{
				Name:        "Batman Dark Knight Returns 1986",
				FilesStatus: model.FilesStatusSingle,
				Size:        100000000,
			},
			flags: Flags{"llm_enabled": true, "comicvine_enabled": true},
			prepareMocks: func(mocks testClassifierMocks) {
				mocks.llmClient.On(
					"Classify",
					matchContext,
					mock.Anything,
				).Return(llm.ClassifyResult{
					Type:       "comic",
					Title:      "Batman: The Dark Knight Returns",
					Year:       1986,
					Confidence: 0.92,
				}, nil)
				// Local search fails → falls through to Comic Vine
				mocks.search.On(
					"ContentBySearch",
					matchContext,
					model.ContentTypeComic,
					"Batman: The Dark Knight Returns",
					model.Year(1986),
				).Return(model.Content{}, classification.ErrUnmatched)
				mocks.comicvineClient.On(
					"SearchVolumes",
					matchContext,
					comicvine.SearchVolumesRequest{
						Query: "Batman: The Dark Knight Returns",
						Limit: 10,
					},
				).Return(comicvine.SearchVolumesResponse{
					Results: []comicvine.VolumeResult{
						{
							ID:            3101,
							Name:          "Batman: The Dark Knight Returns",
							StartYear:     "1986",
							CountOfIssues: 4,
							Publisher: &comicvine.Publisher{
								ID:   10,
								Name: "DC Comics",
							},
						},
					},
				}, nil)
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeComic),
					BaseTitle:   model.NewNullString("Batman: The Dark Knight Returns"),
					Date: model.Date{
						Year: 1986,
					},
				},
				Content: &model.Content{
					Type:        model.ContentTypeComic,
					Source:      "comicvine",
					ID:          "3101",
					Title:       "Batman: The Dark Knight Returns (1986)",
					ReleaseYear: 1986,
					Collections: []model.ContentCollection{
						{Type: "publisher", Source: "comicvine", ID: "10", Name: "DC Comics"},
					},
					Attributes: []model.ContentAttribute{
						{Source: "comicvine", Key: "id", Value: "3101"},
						{Source: "comicvine", Key: "issue_count", Value: "4"},
					},
				},
			},
		},
		// --- Content type detection only (no content attached, BaseTitle not set) ---
		// Ebook detected by extension, no metadata API fires without LLM
		{
			torrent: model.Torrent{
				Name:        "Frank Herbert - Dune",
				FilesStatus: model.FilesStatusSingle,
				Extension:   model.NewNullString("epub"),
				Size:        5000000,
				Files: []model.TorrentFile{
					{Path: "Frank Herbert - Dune.epub", Extension: model.NewNullString("epub"), Size: 5000000},
				},
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeEbook),
				},
			},
		},
		// Comic detected by extension, no metadata API fires without LLM
		{
			torrent: model.Torrent{
				Name:        "Batman - The Dark Knight Returns",
				FilesStatus: model.FilesStatusMulti,
				Size:        100000000,
				Files: []model.TorrentFile{
					{Path: "Batman DKR 01.cbr", Extension: model.NewNullString("cbr"), Size: 25000000},
					{Path: "Batman DKR 02.cbr", Extension: model.NewNullString("cbr"), Size: 25000000},
				},
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeComic),
				},
			},
		},
		// Music detected by extension, no metadata API fires without LLM
		{
			torrent: model.Torrent{
				Name:        "Radiohead - OK Computer (1997) [FLAC]",
				FilesStatus: model.FilesStatusMulti,
				Size:        500000000,
				Files: []model.TorrentFile{
					{Path: "01 Airbag.flac", Extension: model.NewNullString("flac"), Size: 50000000},
					{Path: "02 Paranoid Android.flac", Extension: model.NewNullString("flac"), Size: 60000000},
				},
			},
			expected: classification.Result{
				ContentAttributes: classification.ContentAttributes{
					ContentType: model.NewNullContentType(model.ContentTypeMusic),
				},
			},
		},
	}
	for _, tc := range testCases {
		t.Run(fmt.Sprintf("torrent: %s", tc.torrent.Name), func(t *testing.T) {
			t.Parallel()

			mocks := newTestClassifierMocks(t)

			source, sourceErr := coreSourceProvider{}.provider().source()
			if sourceErr != nil {
				t.Fatal(sourceErr)
				return
			}

			workflow, compileErr := mocks.compiler.Compile(source)
			if compileErr != nil {
				t.Fatal(compileErr)
				return
			}

			if tc.prepareMocks != nil {
				tc.prepareMocks(mocks)
			}

			result, runErr := workflow.Run(context.Background(), "default", tc.flags, tc.torrent)
			if runErr != nil {
				assert.Equal(t, tc.expectedErr, runErr)
				t.Log(runErr)
			} else {
				assert.Equal(t, tc.expected, result)
			}
		})
	}
}

type testClassifierMocks struct {
	compiler          Compiler
	search            *classifier_mocks.LocalSearch
	tmdbClient        *tmdb_mocks.Client
	llmClient         *llm_mocks.Client
	porndbClient      *porndb_mocks.Client
	stashdbClient     *stashdb_mocks.Client
	musicbrainzClient *musicbrainz_mocks.Client
	openlibraryClient *openlibrary_mocks.Client
	comicvineClient   *comicvine_mocks.Client
}

func newTestClassifierMocks(t *testing.T) testClassifierMocks {
	t.Helper()

	search := classifier_mocks.NewLocalSearch(t)
	tmdbClient := tmdb_mocks.NewClient(t)
	llmClient := llm_mocks.NewClient(t)
	porndbClient := porndb_mocks.NewClient(t)
	stashdbClient := stashdb_mocks.NewClient(t)
	musicbrainzClient := musicbrainz_mocks.NewClient(t)
	openlibraryClient := openlibrary_mocks.NewClient(t)
	comicvineClient := comicvine_mocks.NewClient(t)

	return testClassifierMocks{
		compiler: compiler{
			options: []compilerOption{
				compilerFeatures(defaultFeatures),
				celEnvOption,
			},
			dependencies: dependencies{
				search:            search,
				tmdbClient:        tmdbClient,
				llmClient:         llmClient,
				llmMinConfidence:  0.7,
				porndbClient:      porndbClient,
				stashdbClient:     stashdbClient,
				musicbrainzClient: musicbrainzClient,
				openlibraryClient: openlibraryClient,
				comicvineClient:   comicvineClient,
				_logger:           zap.NewNop().Sugar(),
				logger:            zap.NewNop().Sugar(),
			},
		},
		search:            search,
		tmdbClient:        tmdbClient,
		llmClient:         llmClient,
		porndbClient:      porndbClient,
		stashdbClient:     stashdbClient,
		musicbrainzClient: musicbrainzClient,
		openlibraryClient: openlibraryClient,
		comicvineClient:   comicvineClient,
	}
}
