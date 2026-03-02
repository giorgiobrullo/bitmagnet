package classifier

import (
	"regexp"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const detectJAVName = "detect_jav"

type detectJAVAction struct{}

func (detectJAVAction) name() string {
	return detectJAVName
}

var detectJAVPayloadSpec = payloadLiteral[string]{
	literal:     detectJAVName,
	description: "Detect JAV codes in the torrent name and set content type to xxx",
}

// JAV code patterns.
var (
	// FC2-PPV codes (very specific, match anywhere).
	fc2Regex = regexp.MustCompile(`(?i)\bFC2[-_]?PPV[-_]?(\d{4,7})\b`)
	// Standard JAV codes at start of name (after optional bracket prefixes).
	// Matches: SONE-436, ABP-907, MIDV-123, IPZZ-456, etc.
	javCodeRegex = regexp.MustCompile(`(?i)^(?:\[.*?\]\s*)*([A-Z]{2,6})-(\d{3,5})\b`)
	// Known non-JAV prefixes that look like JAV codes.
	javExcludePrefixes = map[string]bool{
		"WEB": true, "DTS": true, "AC3": true, "AAC": true, "AVC": true,
		"DVD": true, "HDR": true, "SDR": true, "BLU": true, "MP4": true,
		"MKV": true, "AVI": true, "ISO": true, "IMG": true, "RAR": true,
		"ZIP": true, "TAR": true, "H26": true, "X26": true, "HEV": true,
	}
)

// videoExtensions used to check if a torrent contains video files.
var videoExtensions = map[string]bool{
	"mp4": true, "mkv": true, "avi": true, "mov": true, "wmv": true,
	"flv": true, "m4v": true, "mpg": true, "mpeg": true, "ts": true,
	"vob": true, "iso": true,
}

// ExtractJAVCode tries to extract a JAV code from a torrent name.
// Returns the normalized code (e.g., "SONE-436", "FC2-PPV-4496995") or empty string.
func ExtractJAVCode(name string) string {
	// Try FC2 first (very specific).
	if m := fc2Regex.FindStringSubmatch(name); m != nil {
		return "FC2-PPV-" + m[1]
	}
	// Try standard JAV code.
	if m := javCodeRegex.FindStringSubmatch(name); m != nil {
		prefix := strings.ToUpper(m[1])
		if javExcludePrefixes[prefix] {
			return ""
		}
		return prefix + "-" + m[2]
	}
	return ""
}

func (detectJAVAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := detectJAVPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result

			// Check if torrent has video files.
			hasVideo := false
			for _, f := range ctx.torrent.Files {
				if f.Extension.Valid && videoExtensions[strings.ToLower(f.Extension.String)] {
					hasVideo = true
					break
				}
			}
			// For single-file torrents, check the torrent extension.
			if !hasVideo && ctx.torrent.Extension.Valid {
				hasVideo = videoExtensions[strings.ToLower(ctx.torrent.Extension.String)]
			}
			if !hasVideo {
				return cl, classification.ErrUnmatched
			}

			// Try to extract a JAV code.
			code := ExtractJAVCode(ctx.torrent.Name)
			if code == "" {
				return cl, classification.ErrUnmatched
			}

			ctx.logger.Infow("detected JAV code",
				"code", code,
				"torrent_name", ctx.torrent.Name)

			cl.ContentType = model.NewNullContentType(model.ContentTypeXxx)
			cl.BaseTitle = model.NewNullString(code)

			return cl, nil
		},
	}, nil
}

func (detectJAVAction) JSONSchema() JSONSchema {
	return detectJAVPayloadSpec.JSONSchema()
}
