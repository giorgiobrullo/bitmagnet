package classifier

import (
	"regexp"
	"strconv"
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
//
// Note: Go's \b treats _ as a word character, so PRED-797_FHD wouldn't match
// with \b after the digits. We use (?:[^0-9]|$) instead to ensure the digit
// sequence terminates without consuming the separator.
var (
	// FC2-PPV codes (very specific, match anywhere).
	fc2Regex = regexp.MustCompile(`(?i)\bFC2[-_]?PPV[-_]?(\d{4,7})(?:[^0-9]|$)`)
	// Standard JAV codes at start of name (after optional bracket prefixes).
	// Matches: SONE-436, ABP-907, MIDV-123, PRED-797_FHD, etc.
	javCodeRegex = regexp.MustCompile(`(?i)^(?:\[.*?\]\s*)*([A-Z]{2,6})-(\d{3,5})(?:[^0-9]|$)`)
	// Standard JAV codes without hyphen at start of name.
	// Matches: HND573, DTRS019, MADV270, etc.
	javCodeNoHyphenRegex = regexp.MustCompile(`(?i)^(?:\[.*?\]\s*)*([A-Z]{2,6})(\d{3,5})(?:[^0-9a-zA-Z]|$)`)
	// Loose JAV code: preceded by any non-ASCII-letter character.
	// Catches codes after URL prefixes, site names, CJK text, parens, etc.
	javCodeLooseRegex = regexp.MustCompile(`(?i)[^a-zA-Z]([A-Z]{2,6})-(\d{3,5})(?:[^0-9]|$)`)
	// Number-prefix JAV codes (MGS/amateur format): 390JNT-112, 259LUXU-1234, etc.
	javCodeNumPrefixRegex = regexp.MustCompile(`(?i)(?:^|[^0-9])(\d{3,4})([A-Z]{2,5})-(\d{3,5})(?:[^0-9]|$)`)
	// Numeric JAV codes: MMDDYY-NNN (Caribbeancom) or MMDDYY_NNN (1Pondo/10Musume/Pacopacomama).
	// Only matched when context keywords are present to avoid false positives.
	javNumericHyphenRegex     = regexp.MustCompile(`(?:^|[^0-9])(\d{6})-(\d{2,3})(?:[^0-9]|$)`)
	javNumericUnderscoreRegex = regexp.MustCompile(`(?:^|[^0-9])(\d{6})_(\d{2,3})(?:[^0-9]|$)`)
	// Context keywords that indicate an uncensored JAV provider using numeric codes.
	javNumericContextKeywords = regexp.MustCompile(`(?i)(?:caribbean|caribbeancom|1pondo|1pon|10musume|10mu|muramura|pacopacomama|paco|h0930|c0930|h4610|carib|一本道)`)
	// Known non-JAV prefixes that look like JAV codes.
	javExcludePrefixes = map[string]bool{
		"WEB": true, "DTS": true, "AC3": true, "AAC": true, "AVC": true,
		"DVD": true, "HDR": true, "SDR": true, "BLU": true, "MP4": true,
		"MKV": true, "AVI": true, "ISO": true, "IMG": true, "RAR": true,
		"ZIP": true, "TAR": true, "H26": true, "X26": true, "HEV": true,
	}
)

// isValidMMDDYY checks if a 6-digit string represents a plausible MMDDYY date.
func isValidMMDDYY(s string) bool {
	if len(s) != 6 {
		return false
	}
	mm, _ := strconv.Atoi(s[0:2])
	dd, _ := strconv.Atoi(s[2:4])
	return mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31
}

// ExtractJAVCode tries to extract a JAV code from a torrent name.
// Returns the normalized code (e.g., "SONE-436", "FC2-PPV-4496995") or empty string.
func ExtractJAVCode(name string) string {
	// Try FC2 first (very specific).
	if m := fc2Regex.FindStringSubmatch(name); m != nil {
		return "FC2-PPV-" + m[1]
	}
	// Try standard JAV code at start (most reliable).
	if m := javCodeRegex.FindStringSubmatch(name); m != nil {
		prefix := strings.ToUpper(m[1])
		if !javExcludePrefixes[prefix] {
			return prefix + "-" + m[2]
		}
	}
	// Try non-hyphenated JAV code at start: HND573, DTRS019, etc.
	if m := javCodeNoHyphenRegex.FindStringSubmatch(name); m != nil {
		prefix := strings.ToUpper(m[1])
		if !javExcludePrefixes[prefix] {
			return prefix + "-" + m[2]
		}
	}
	// Number-prefix JAV codes: 390JNT-112, 259LUXU-1234, etc.
	if m := javCodeNumPrefixRegex.FindStringSubmatch(name); m != nil {
		prefix := strings.ToUpper(m[2])
		if !javExcludePrefixes[prefix] {
			return m[1] + prefix + "-" + m[3]
		}
	}
	// Numeric JAV codes (Caribbeancom/1Pondo family): require context keywords.
	if javNumericContextKeywords.MatchString(name) {
		if m := javNumericHyphenRegex.FindStringSubmatch(name); m != nil {
			if isValidMMDDYY(m[1]) {
				return m[1] + "-" + m[2]
			}
		}
		if m := javNumericUnderscoreRegex.FindStringSubmatch(name); m != nil {
			if isValidMMDDYY(m[1]) {
				return m[1] + "_" + m[2]
			}
		}
	}
	// Loose scan: JAV codes anywhere after non-letter characters.
	if m := javCodeLooseRegex.FindStringSubmatch(name); m != nil {
		prefix := strings.ToUpper(m[1])
		if !javExcludePrefixes[prefix] {
			return prefix + "-" + m[2]
		}
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

			// Try to extract a JAV code from the torrent name.
			// The regex is anchored to the start of the name (after optional brackets),
			// making false positives very unlikely. No file extension check needed.
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
