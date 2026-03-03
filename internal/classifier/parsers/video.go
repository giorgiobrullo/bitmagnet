package parsers

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/keywords"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/bitmagnet-io/bitmagnet/internal/regex"
	"github.com/hedhyw/rex/pkg/dialect"
	"github.com/hedhyw/rex/pkg/rex"
)

var titleTokens = []dialect.Token{
	rex.Group.Define(
		rex.Group.Composite(
			rex.Group.NonCaptured(
				regex.AnyWordChar().Repeat().OneOrMore(),
				rex.Group.NonCaptured(
					rex.Chars.Single('-'), regex.AnyWordChar().Repeat().OneOrMore(),
				).Repeat().ZeroOrMore(),
			),
			regex.AnyNonWordChar().Repeat().OneOrMore(),
		).NonCaptured().Repeat().OneOrMore(),
		rex.Group.Composite(
			regex.AnyNonWordChar().Repeat().OneOrMore(),
			rex.Chars.End(),
		).NonCaptured(),
	),
}

var titleRegex = rex.New(
	rex.Chars.Begin(),
	rex.Group.NonCaptured(titleTokens...),
).MustCompile()

var yearTokens = []dialect.Token{
	rex.Group.NonCaptured(rex.Common.NotClass(rex.Chars.WordCharacter()).Repeat().ZeroOrMore()),
	rex.Group.Define(
		rex.Group.Composite(
			rex.Common.Text("18"), rex.Common.Text("19"), rex.Common.Text("20"),
		).NonCaptured(),
		rex.Chars.Digits().Repeat().Exactly(2),
	),
	rex.Group.Composite(
		rex.Common.NotClass(rex.Chars.WordCharacter()),
		rex.Chars.End(),
	).NonCaptured(),
}

var titleYearRegex = rex.New(
	rex.Chars.Begin(),
	rex.Group.NonCaptured(rex.Group.NonCaptured(titleTokens...), rex.Group.NonCaptured(yearTokens...)),
).MustCompile()

var titleEpisodesRegex = rex.New(
	rex.Chars.Begin(),
	rex.Group.NonCaptured(
		rex.Group.NonCaptured(titleTokens...),
		model.EpisodesToken,
	),
).MustCompile()

var multiRegex = keywords.MustNewRegexFromKeywords("multi", "dual")

var separatorToken = rex.Chars.Runes(" ._")

var titlePartRegex = rex.New(
	separatorToken.Repeat().ZeroOrOne(),
	rex.Group.Define(regex.WordToken()),
	separatorToken.Repeat().ZeroOrOne(),
).MustCompile()

var trimTitleRegex = rex.New(
	rex.Chars.Begin(),
	rex.Group.Composite(
		rex.Group.NonCaptured(
			rex.Chars.Single('['),
			rex.Common.NotClass(rex.Chars.Single(']')).Repeat().OneOrMore(),
			rex.Chars.Single(']'),
		),
		rex.Group.NonCaptured(
			rex.Chars.Single('【'),
			rex.Common.NotClass(rex.Chars.Single('】')).Repeat().OneOrMore(),
			rex.Chars.Single('】'),
		),
	).NonCaptured().Repeat().ZeroOrOne(),
	regex.AnyNonWordChar().Repeat().ZeroOrMore(),
	rex.Group.Define(
		regex.WordToken(),
		rex.Group.NonCaptured(
			rex.Chars.Any(),
			regex.WordToken(),
		).Repeat().ZeroOrMore(),
	),
	regex.AnyNonWordChar().Repeat().ZeroOrMore(),
	rex.Chars.End(),
).MustCompile()

func cleanTitle(title string) string {
	title = titlePartRegex.ReplaceAllStringFunc(title, func(s string) string {
		partMatch := titlePartRegex.FindStringSubmatch(s)
		if partMatch == nil {
			return ""
		}

		return partMatch[1] + " "
	})
	title = trimTitleRegex.ReplaceAllString(title, "$1")

	return title
}

func parseTitleYear(input string) (string, model.Year, string, error) {
	if match := titleYearRegex.FindStringSubmatch(input); match != nil {
		yearMatch, _ := strconv.ParseUint(match[2], 10, 16)
		title := cleanTitle(match[1])

		if title != "" {
			return title, model.Year(yearMatch), input[len(match[0]):], nil
		}
	}

	return "", 0, "", classification.ErrUnmatched
}

func parseTitle(input string) (title string, rest string, err error) {
	if match := titleRegex.FindStringSubmatch(input); match != nil {
		title = cleanTitle(match[1])
		if title != "" {
			return title, input[len(match[0]):], nil
		}
	}

	return "", "", classification.ErrUnmatched
}

func parseTitleYearEpisodes(input string) (string, model.Year, model.Episodes, string, error) {
	if match := titleEpisodesRegex.FindStringSubmatch(input); match != nil {
		title := match[1]
		year := model.Year(0)

		if t, y, _, err := parseTitleYear(title); err == nil {
			title = t
			year = y
		} else {
			title = cleanTitle(title)
		}

		episodes := model.EpisodesMatchToEpisodes(match[2:])

		return title, year, episodes, input[len(match[0]):], nil
	}

	return "", 0, nil, "", classification.ErrUnmatched
}

func ParseTitleYearEpisodes(
	contentType model.NullContentType,
	input string,
) (string, model.Year, model.Episodes, string, error) {
	if !contentType.Valid || contentType.ContentType == model.ContentTypeTvShow {
		if title, year, episodes, rest, err := parseTitleYearEpisodes(input); err == nil {
			return title, year, episodes, rest, nil
		}
	}

	if title, year, rest, err := parseTitleYear(input); err == nil {
		return title, year, nil, rest, nil
	}

	if title, rest, err := parseTitle(input); err == nil {
		return title, 0, nil, rest, nil
	}

	return "", 0, nil, "", classification.ErrUnmatched
}

// xxxBracketSuffixRegex strips bracketed suffixes from end of name.
var xxxBracketSuffixRegex = regexp.MustCompile(`(?i)\s*(?:\[[^\]]*\]|\([^)]*\))\s*$`)

// xxxFileExtRegex strips common video file extensions from end of name.
var xxxFileExtRegex = regexp.MustCompile(`(?i)\.(mp4|mkv|wmv|avi|mov|flv|m4v|ts|webm)$`)

// xxxTechTokens are quality/tech tokens stripped from the end of the name.
var xxxTechTokens = map[string]bool{
	"xxx": true, "1080p": true, "720p": true, "480p": true, "2160p": true,
	"4k": true, "8k": true, "hevc": true, "x264": true, "x265": true,
	"h264": true, "h265": true, "avc": true, "mp4": true, "mkv": true,
	"wmv": true, "avi": true, "prt": true, "web": true, "hd": true,
	"fhd": true, "uhd": true, "sdr": true, "hdr": true, "sd": true,
	"hr": true, "internal": true, "webrip": true,
	// VR tokens.
	"vr": true, "vr180": true, "vr360": true, "3dh": true, "lr": true,
	// Language tags that leak into scene names.
	"japanese": true, "english": true, "chinese": true,
}

// xxxReleaseGroupRegex matches common release group tags (all uppercase, 2-10 chars).
var xxxReleaseGroupRegex = regexp.MustCompile(`^[A-Za-z]{2,10}$`)

// xxxKnownReleaseGroups are scene release groups frequently seen as dot-separated tokens.
var xxxKnownReleaseGroups = map[string]bool{
	"ktr": true, "wrb": true, "nbq": true, "xvx": true, "xc": true,
	"prt": true, "rarbg": true, "prime": true, "kleenex": true,
	"fetish": true, "vsex": true, "lewd": true, "galaxxxy": true,
	"ohrly": true, "lust": true,
}

// xxxResolutionRegex matches resolution tokens like 2700p, 3600p, 5400p (VR resolutions).
var xxxResolutionRegex = regexp.MustCompile(`(?i)^\d{3,4}p$`)

// xxxDateRegex detects dated scene patterns like "Studio 21 08 09 Scene Name".
// Matches 3 consecutive 1-2 digit numbers separated by dots, spaces, or underscores.
var xxxDateRegex = regexp.MustCompile(`^(.+?)[\s._](\d{1,2})[\s._](\d{1,2})[\s._](\d{1,2})[\s._](.+)$`)

// parseXxxTitle extracts a meaningful title from xxx torrent names.
// It strips tech tokens, release groups, and studio/date prefixes to produce
// a clean title suitable for PornDB/StashDB API search.
func parseXxxTitle(name string) string {
	// 1. Strip bracketed suffixes from end.
	for xxxBracketSuffixRegex.MatchString(name) {
		name = xxxBracketSuffixRegex.ReplaceAllString(name, "")
	}

	// 2. Strip file extensions.
	name = xxxFileExtRegex.ReplaceAllString(name, "")

	// 3. Split into tokens and strip tech tokens from the end.
	sep := "."
	if strings.Contains(name, "_") && !strings.Contains(name, ".") {
		sep = "_"
	} else if strings.Contains(name, " ") && !strings.Contains(name, ".") {
		sep = " "
	}
	tokens := strings.Split(name, sep)

	// Strip tech tokens from end.
	for len(tokens) > 0 {
		last := strings.ToLower(strings.TrimSpace(tokens[len(tokens)-1]))
		if last == "" || xxxTechTokens[last] {
			tokens = tokens[:len(tokens)-1]
		} else {
			break
		}
	}

	// 4. Strip release group suffix: final "-Word" token.
	if len(tokens) > 0 {
		lastToken := tokens[len(tokens)-1]
		if idx := strings.LastIndex(lastToken, "-"); idx > 0 {
			suffix := lastToken[idx+1:]
			// Only strip if it looks like a release group (single word, no spaces).
			if len(suffix) > 0 && !strings.Contains(suffix, " ") {
				tokens[len(tokens)-1] = lastToken[:idx]
				if strings.TrimSpace(tokens[len(tokens)-1]) == "" {
					tokens = tokens[:len(tokens)-1]
				}
			}
		}
	}

	// Rejoin with spaces.
	name = strings.Join(tokens, " ")

	// Replace remaining separators.
	name = strings.ReplaceAll(name, ".", " ")
	name = strings.ReplaceAll(name, "_", " ")

	// 5. Try to detect dated scene pattern and extract only the part after the date.
	if m := xxxDateRegex.FindStringSubmatch(name); m != nil {
		n1, _ := strconv.Atoi(m[2])
		n2, _ := strconv.Atoi(m[3])
		n3, _ := strconv.Atoi(m[4])
		// Check if it looks like a date: YY.MM.DD or DD.MM.YY
		isDate := (n2 >= 1 && n2 <= 12 && n3 >= 1 && n3 <= 31) ||
			(n1 >= 1 && n1 <= 31 && n2 >= 1 && n2 <= 12)
		if isDate {
			// Strip tech tokens and release groups from the scene name portion after
			// the date, since the main tech-stripping loop (step 3) ran before date
			// detection and couldn't strip tokens that follow the scene name.
			sceneParts := strings.Fields(m[5])
			for len(sceneParts) > 0 {
				last := strings.ToLower(sceneParts[len(sceneParts)-1])
				if xxxTechTokens[last] || xxxKnownReleaseGroups[last] || xxxResolutionRegex.MatchString(last) {
					sceneParts = sceneParts[:len(sceneParts)-1]
				} else {
					break
				}
			}
			name = strings.TrimSpace(m[1]) + " " + strings.Join(sceneParts, " ")
		}
	}

	return cleanTitle(strings.TrimSpace(name))
}

func ParseVideoContent(torrent model.Torrent, result classification.Result) (classification.ContentAttributes, error) {
	name := SanitizeTorrentName(torrent.Name)
	title, year, episodes, rest, err := ParseTitleYearEpisodes(result.ContentType, name)
	if err != nil {
		if !result.ContentType.Valid {
			return classification.ContentAttributes{}, err
		}

		rest = name
	}

	ct := model.NullContentType{}

	switch {
	case result.ContentType.Valid:
		ct = model.NullContentType{Valid: true, ContentType: result.ContentType.ContentType}
	case len(episodes) > 0 || result.Date.IsValid():
		ct = model.NullContentType{Valid: true, ContentType: model.ContentTypeTvShow}
	case !year.IsNil():
		ct = model.NullContentType{Valid: true, ContentType: model.ContentTypeMovie}
	}

	if ct.ContentType != model.ContentTypeTvShow {
		episodes = nil

		if year.IsNil() {
			if ct.ContentType == model.ContentTypeXxx {
				title = parseXxxTitle(name)
			} else {
				title = ""
			}
			rest = name
		}
	}

	attrs := classification.ContentAttributes{
		ContentType:   ct,
		BaseTitle:     model.NullString{Valid: title != "", String: title},
		Date:          model.Date{Year: year},
		Episodes:      episodes,
		Languages:     model.InferLanguages(rest),
		LanguageMulti: multiRegex.MatchString(rest),
	}
	attrs.InferVideoAttributes(rest)

	return attrs, nil
}
