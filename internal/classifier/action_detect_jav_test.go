package classifier

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestExtractJAVCode(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		input    string
		expected string
	}{
		// === Standard JAV codes (hyphenated, at start) ===
		{name: "SSIS at start", input: "SSIS-541", expected: "SSIS-541"},
		{name: "SIRO at start", input: "SIRO-4785", expected: "SIRO-4785"},
		{name: "SDJS at start", input: "SDJS-333", expected: "SDJS-333"},
		{name: "KANO at start", input: "KANO-029", expected: "KANO-029"},
		{name: "ROE with suffix", input: "ROE-415-U", expected: "ROE-415"},
		{name: "IPZZ at start", input: "IPZZ-633", expected: "IPZZ-633"},
		{name: "ADN with release group", input: "ADN-740-BFR-TeAm", expected: "ADN-740"},
		{name: "SPRD at start", input: "SPRD-497", expected: "SPRD-497"},
		{name: "NKKD at start", input: "NKKD-302", expected: "NKKD-302"},
		{name: "HNDS at start", input: "HNDS-076", expected: "HNDS-076"},
		{name: "CEMD at start", input: "CEMD-812", expected: "CEMD-812"},
		{name: "JUQ with suffixes", input: "JUQ-759-uncensored-HD", expected: "JUQ-759"},

		// === Standard JAV with .mp4 extension ===
		{name: "ANX with extension", input: "ANX-126.mp4", expected: "ANX-126"},

		// === Non-hyphenated JAV codes at start ===
		{name: "pgd lowercase hyphen", input: "pgd-628-uncensored", expected: "PGD-628"},
		{name: "dldss with ch suffix", input: "dldss-015ch", expected: "DLDSS-015"},

		// === JAV codes after bracket prefixes ===
		{name: "code after brackets", input: "[SubGroup] SONE-436 Title Here", expected: "SONE-436"},
		{name: "code after CJK brackets", input: "【無修正】PRED-797_FHD", expected: "PRED-797"},

		// === FC2 codes ===
		{name: "FC2-PPV standard", input: "FC2-PPV-4816508", expected: "FC2-PPV-4816508"},
		{name: "FC2PPV no hyphens", input: "FC2PPV-1217346", expected: "FC2-PPV-1217346"},
		{name: "FC2 with underscore", input: "FC2_PPV_993790 title here", expected: "FC2-PPV-993790"},

		// === Number-prefix JAV codes (MGS/amateur) ===
		{name: "390JNT format", input: "390JNT-112 Scene Title", expected: "390JNT-112"},
		{name: "259LUXU format", input: "259LUXU-1234.mp4", expected: "259LUXU-1234"},

		// === Loose JAV codes (after non-letter chars) ===
		{name: "hyphenated code after site", input: "sogo7.cc@JDSY-132 title", expected: "JDSY-132"},
		// Non-hyphenated code after prefix is not detected (only matched at start).
		{name: "non-hyphenated code after site", input: "sogo7.cc@JDSY132 title", expected: ""},

		// === Numeric JAV codes (Caribbeancom/1Pondo family) ===
		{name: "caribbeancom hyphen code", input: "Caribbeancom 042415-860 Uncensored", expected: "042415-860"},
		{name: "1pondo underscore code", input: "1Pondo 022016_249 HD", expected: "022016_249"},
		{name: "10musume underscore code", input: "10musume 110915_01 Scene", expected: "110915_01"},
		{name: "pacopacomama code", input: "pacopacomama-032116_057", expected: "032116_057"},
		{name: "carib keyword shorthand", input: "carib-042415-860", expected: "042415-860"},
		{name: "h0930 context keyword", input: "h0930 ori1234 011215_35", expected: "011215_35"},

		// === Numeric codes WITHOUT context keywords → should NOT match ===
		{name: "no context no match", input: "Random 042415-860 Video", expected: ""},
		{name: "bare numeric no match", input: "022016_249.mp4", expected: ""},

		// === Invalid MMDDYY date → should NOT match ===
		{name: "invalid month 13", input: "caribbeancom 132415-860", expected: ""},
		{name: "invalid day 32", input: "1pondo 013216_249", expected: ""},

		// === Non-JAV content → should NOT match ===
		{name: "tech prefix excluded", input: "WEB-480 something", expected: ""},
		{name: "regular movie", input: "The.Matrix.1999.1080p.BluRay.x264", expected: ""},
		{name: "TV show", input: "Breaking.Bad.S01E01.720p", expected: ""},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			result := ExtractJAVCode(tc.input)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func TestIsValidMMDDYY(t *testing.T) {
	t.Parallel()

	tests := []struct {
		input    string
		expected bool
	}{
		{"042415", true},  // April 24
		{"022016", true},  // Feb 20
		{"110915", true},  // Nov 09
		{"011215", true},  // Jan 12
		{"032116", true},  // March 21
		{"120131", true},  // Dec 01
		{"010100", true},  // Jan 01
		{"132415", false}, // month 13 invalid
		{"013216", false}, // day 32 invalid
		{"002415", false}, // month 00 invalid
		{"010015", false}, // day 00 invalid
		{"12345", false},  // too short
		{"1234567", false}, // too long
	}

	for _, tc := range tests {
		t.Run(tc.input, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, tc.expected, isValidMMDDYY(tc.input))
		})
	}
}
