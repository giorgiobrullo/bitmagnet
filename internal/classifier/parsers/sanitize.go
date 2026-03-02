package parsers

import (
	"regexp"
	"strings"
)

// siteURLRegex matches site URL prefixes at the start of torrent names.
// Examples: "www.UIndex.org - ", "xxx.cc @ ", "example.site - "
var siteURLRegex = regexp.MustCompile(`(?i)^[\w.-]+\.(?:com|org|net|io|tv|cc|me|site|xyz|club|to|pw|ws|eu|info|biz|ru|de|fr|it|es|br|uk|us|se|nl|be|at|ch|pl|cz|hu|ro|bg)\s*[-@:]\s*`)

// cjkSiteRegex matches common Chinese torrent site watermarks.
var cjkSiteRegex = regexp.MustCompile(`(?:6v电影|电影天堂|阳光电影|地址发布页|最新电影|高清电影|迅雷下载)\s*`)

// SanitizeTorrentName strips common junk patterns from torrent names
// before title parsing. This improves title extraction by removing
// site URL prefixes and CJK site watermarks that confuse the parser.
func SanitizeTorrentName(name string) string {
	// Strip site URL prefixes.
	name = siteURLRegex.ReplaceAllString(name, "")

	// Strip known CJK site watermarks.
	name = cjkSiteRegex.ReplaceAllString(name, "")

	// Trim leading/trailing whitespace and common separators.
	name = strings.TrimSpace(name)
	name = strings.TrimLeft(name, "-@:_ ")

	return name
}
