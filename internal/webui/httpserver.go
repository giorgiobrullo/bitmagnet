package webui

import (
	"bytes"
	"errors"
	"io/fs"
	"net/http"
	"strings"
	"time"

	"github.com/bitmagnet-io/bitmagnet/internal/httpserver"
	"github.com/bitmagnet-io/bitmagnet/webui"
	"github.com/gin-gonic/gin"
	"go.uber.org/fx"
	"go.uber.org/zap"
)

type Params struct {
	fx.In
	Config httpserver.Config
	Logger *zap.SugaredLogger
}

type Result struct {
	fx.Out
	Option httpserver.Option `group:"http_server_options"`
}

func New(p Params) Result {
	basePath := strings.TrimRight(p.Config.BasePath, "/")
	return Result{
		Option: &builder{
			logger:   p.Logger.Named("webui"),
			basePath: basePath,
		},
	}
}

type builder struct {
	logger   *zap.SugaredLogger
	basePath string
}

func (*builder) Key() string {
	return "webui"
}

func (b *builder) Apply(r gin.IRouter) error {
	webuiFS := webui.StaticFS()

	appRoot, appRootErr := fs.Sub(webuiFS, "dist/bitmagnet/browser")
	if appRootErr != nil {
		b.logger.Errorf(
			"the webui app root directory is missing; run `npm run build` within the `webui` folder: %v",
			appRootErr)

		return nil
	}

	var modifiedIndex []byte
	if b.basePath != "" {
		indexHTML, readErr := fs.ReadFile(appRoot, "index.html")
		if readErr == nil {
			modifiedIndex = bytes.Replace(
				indexHTML,
				[]byte(`<base href="/webui"`),
				[]byte(`<base href="`+b.basePath+`/webui"`),
				1,
			)
		}
	}

	r.StaticFS("/webui", wrappedFs{
		FileSystem:    http.FS(appRoot),
		modifiedIndex: modifiedIndex,
	})
	r.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, b.basePath+"/webui")
	})

	return nil
}

type wrappedFs struct {
	http.FileSystem
	modifiedIndex []byte // if non-nil, returned instead of original index.html
}

func (w wrappedFs) Open(name string) (http.File, error) {
	f, err := w.FileSystem.Open(name)
	if err != nil && errors.Is(err, fs.ErrNotExist) {
		// SPA fallback: serve (possibly modified) index.html
		if w.modifiedIndex != nil {
			return newInMemoryFile("index.html", w.modifiedIndex), nil
		}
		return w.FileSystem.Open("/index.html")
	}

	// Intercept direct index.html requests to serve modified version
	if w.modifiedIndex != nil && (name == "/index.html" || name == "index.html") {
		if f != nil {
			f.Close()
		}
		return newInMemoryFile("index.html", w.modifiedIndex), nil
	}

	return f, err
}

// inMemoryFile implements http.File for serving in-memory content.
type inMemoryFile struct {
	*bytes.Reader
	name string
	size int64
}

func newInMemoryFile(name string, data []byte) *inMemoryFile {
	return &inMemoryFile{
		Reader: bytes.NewReader(data),
		name:   name,
		size:   int64(len(data)),
	}
}

func (f *inMemoryFile) Close() error                       { return nil }
func (f *inMemoryFile) Readdir(int) ([]fs.FileInfo, error) { return nil, nil }
func (f *inMemoryFile) Stat() (fs.FileInfo, error)         { return f, nil }
func (f *inMemoryFile) Name() string                       { return f.name }
func (f *inMemoryFile) Size() int64                        { return f.size }
func (f *inMemoryFile) Mode() fs.FileMode                  { return 0444 }
func (f *inMemoryFile) ModTime() time.Time                 { return time.Time{} }
func (f *inMemoryFile) IsDir() bool                        { return false }
func (f *inMemoryFile) Sys() interface{}                   { return nil }
