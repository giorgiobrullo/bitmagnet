package metatube

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"sync"
	"time"

	"github.com/metatube-community/metatube-sdk-go/database"
	"github.com/metatube-community/metatube-sdk-go/engine"
	"github.com/metatube-community/metatube-sdk-go/engine/providerid"
	mtmodel "github.com/metatube-community/metatube-sdk-go/model"
	mt "github.com/metatube-community/metatube-sdk-go/provider"
	"go.uber.org/zap"

	// Register JAV providers (all except theporndb, which bitmagnet handles separately).
	_ "github.com/metatube-community/metatube-sdk-go/provider/10musume"
	_ "github.com/metatube-community/metatube-sdk-go/provider/1pondo"
	_ "github.com/metatube-community/metatube-sdk-go/provider/av-league"
	_ "github.com/metatube-community/metatube-sdk-go/provider/avbase"
	_ "github.com/metatube-community/metatube-sdk-go/provider/aventertainments"
	_ "github.com/metatube-community/metatube-sdk-go/provider/c0930"
	_ "github.com/metatube-community/metatube-sdk-go/provider/caribbeancom"
	_ "github.com/metatube-community/metatube-sdk-go/provider/caribbeancompr"
	_ "github.com/metatube-community/metatube-sdk-go/provider/dahlia"
	_ "github.com/metatube-community/metatube-sdk-go/provider/duga"
	_ "github.com/metatube-community/metatube-sdk-go/provider/faleno"
	_ "github.com/metatube-community/metatube-sdk-go/provider/fanza"
	_ "github.com/metatube-community/metatube-sdk-go/provider/fc2"
	_ "github.com/metatube-community/metatube-sdk-go/provider/fc2hub"
	_ "github.com/metatube-community/metatube-sdk-go/provider/gcolle"
	_ "github.com/metatube-community/metatube-sdk-go/provider/getchu"
	_ "github.com/metatube-community/metatube-sdk-go/provider/h0930"
	_ "github.com/metatube-community/metatube-sdk-go/provider/h4610"
	_ "github.com/metatube-community/metatube-sdk-go/provider/heydouga"
	_ "github.com/metatube-community/metatube-sdk-go/provider/heyzo"
	_ "github.com/metatube-community/metatube-sdk-go/provider/jav321"
	_ "github.com/metatube-community/metatube-sdk-go/provider/javbus"
	_ "github.com/metatube-community/metatube-sdk-go/provider/javfree"
	_ "github.com/metatube-community/metatube-sdk-go/provider/kin8tengoku"
	_ "github.com/metatube-community/metatube-sdk-go/provider/madouqu"
	_ "github.com/metatube-community/metatube-sdk-go/provider/mgstage"
	_ "github.com/metatube-community/metatube-sdk-go/provider/modelmediaasia"
	_ "github.com/metatube-community/metatube-sdk-go/provider/muramura"
	_ "github.com/metatube-community/metatube-sdk-go/provider/mywife"
	_ "github.com/metatube-community/metatube-sdk-go/provider/pacopacomama"
	_ "github.com/metatube-community/metatube-sdk-go/provider/pcolle"
	_ "github.com/metatube-community/metatube-sdk-go/provider/sod"
	_ "github.com/metatube-community/metatube-sdk-go/provider/tokyo-hot"
)

var errNotFound = errors.New("metatube: JAV not found")

// providerConfig implements mt.Config to pass provider configuration options.
type providerConfig struct {
	data map[string]string
}

func (c providerConfig) Has(key string) bool {
	_, ok := c.data[key]
	return ok
}

func (c providerConfig) GetString(key string) (string, error) {
	v, ok := c.data[key]
	if !ok {
		return "", fmt.Errorf("key %q not found", key)
	}
	return v, nil
}

func (c providerConfig) GetBool(key string) (bool, error) {
	v, ok := c.data[key]
	if !ok {
		return false, fmt.Errorf("key %q not found", key)
	}
	return strconv.ParseBool(v)
}

func (c providerConfig) GetInt64(key string) (int64, error) {
	v, ok := c.data[key]
	if !ok {
		return 0, fmt.Errorf("key %q not found", key)
	}
	return strconv.ParseInt(v, 10, 64)
}

func (c providerConfig) GetFloat64(key string) (float64, error) {
	v, ok := c.data[key]
	if !ok {
		return 0, fmt.Errorf("key %q not found", key)
	}
	return strconv.ParseFloat(v, 64)
}

func (c providerConfig) GetDuration(key string) (time.Duration, error) {
	v, ok := c.data[key]
	if !ok {
		return 0, fmt.Errorf("key %q not found", key)
	}
	return time.ParseDuration(v)
}

type client struct {
	once   sync.Once
	engine *engine.Engine
	err    error
	logger *zap.SugaredLogger
}

func (c *client) initEngine() {
	db, dbErr := database.Open(&database.Config{
		DSN:                  "",
		DisableAutomaticPing: true,
	})
	if dbErr != nil {
		c.err = dbErr
		return
	}

	// Disable theporndb provider by setting its priority to 0.
	// NOTE: We use WithActorProviderConfig as a workaround for an upstream bug in
	// engine/init.go:64 where initMovieProviders reads actorProviderConfigs instead
	// of movieProviderConfigs, so WithMovieProviderConfig is silently ignored.
	disableConfig := providerConfig{data: map[string]string{"priority": "0"}}

	c.engine = engine.New(db,
		engine.WithActorProviderConfig("theporndb", disableConfig),
		engine.WithRequestTimeout(30*time.Second),
	)
	c.engine.DBAutoMigrate(true)
}

func (c *client) SearchJAV(_ context.Context, code string) (MovieResult, error) {
	c.once.Do(c.initEngine)
	if c.err != nil {
		return MovieResult{}, c.err
	}

	results, searchErr := c.engine.SearchMovieAll(code, false)
	if searchErr != nil {
		if errors.Is(searchErr, mt.ErrInfoNotFound) || errors.Is(searchErr, mt.ErrInvalidKeyword) {
			return MovieResult{}, errNotFound
		}
		return MovieResult{}, searchErr
	}

	if len(results) == 0 {
		return MovieResult{}, errNotFound
	}

	// Take the first result (sorted by priority * keyword match).
	best := results[0]

	// Fetch full details from the provider.
	pid, pidErr := providerid.New(best.Provider, best.ID)
	if pidErr != nil {
		return searchResultToMovieResult(best), nil
	}

	info, infoErr := c.engine.GetMovieInfoByProviderID(pid, true)
	if infoErr != nil {
		c.logger.Debugw("metatube full info fetch failed, using search result",
			"code", code,
			"provider", best.Provider,
			"error", infoErr)
		return searchResultToMovieResult(best), nil
	}

	return movieInfoToMovieResult(info), nil
}

func formatDate(d time.Time) string {
	if d.IsZero() {
		return ""
	}
	return d.Format("2006-01-02")
}

func searchResultToMovieResult(sr *mtmodel.MovieSearchResult) MovieResult {
	return MovieResult{
		Provider:    sr.Provider,
		Number:      sr.Number,
		Title:       sr.Title,
		Actors:      sr.Actors,
		CoverURL:    sr.CoverURL,
		Score:       sr.Score,
		ReleaseDate: formatDate(time.Time(sr.ReleaseDate)),
	}
}

func movieInfoToMovieResult(info *mtmodel.MovieInfo) MovieResult {
	return MovieResult{
		Provider:    info.Provider,
		Number:      info.Number,
		Title:       info.Title,
		Actors:      info.Actors,
		Maker:       info.Maker,
		Label:       info.Label,
		Series:      info.Series,
		Genres:      info.Genres,
		CoverURL:    bestCoverURL(info),
		Score:       info.Score,
		Runtime:     info.Runtime,
		ReleaseDate: formatDate(time.Time(info.ReleaseDate)),
	}
}

func bestCoverURL(info *mtmodel.MovieInfo) string {
	if info.BigCoverURL != "" {
		return info.BigCoverURL
	}
	if info.CoverURL != "" {
		return info.CoverURL
	}
	if info.BigThumbURL != "" {
		return info.BigThumbURL
	}
	return info.ThumbURL
}
