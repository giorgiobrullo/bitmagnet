package classifier

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLevenshteinFindCloseMatch(t *testing.T) {
	t.Parallel()

	titles := func(s []string) []string { return s }

	for _, tc := range []struct {
		target    string
		results   [][]string
		wantMatch bool
		want      string
	}{
		// short titles have to match exactly
		{"EPL", [][]string{{"Replay"}}, false, ""},
		{"Hack", [][]string{{".hack//Sign"}}, false, ""},
		{"Halo", [][]string{{"Halo"}}, true, "Halo"},
		// longer titles still tolerate the differences release names have
		{"Kono Subarashii Sekai ni Shukufuku wo", [][]string{
			{"KonoSuba: God's Blessing on This Wonderful World! 3", "Kono Subarashii Sekai ni Shukufuku wo! 3"},
		}, true, "KonoSuba: God's Blessing on This Wonderful World! 3"},
		{"Mushoku Tensei Jobless Reincarnation", [][]string{
			{"Mushoku Tensei: Isekai Ittara Honki Dasu"},
			{"Mushoku Tensei: Jobless Reincarnation"},
		}, true, "Mushoku Tensei: Jobless Reincarnation"},
		{"Kusuriya no Hitorigoto", [][]string{{"The Apothecary Diaries", "Kusuriya no Hitorigoto"}}, true, "The Apothecary Diaries"},
	} {
		got, ok := levenshteinFindCloseMatch(tc.target, tc.results, titles)
		assert.Equal(t, tc.wantMatch, ok, tc.target)
		if tc.wantMatch && ok {
			assert.Equal(t, tc.want, got[0], tc.target)
		}
	}
}

func TestLevenshteinFindBestMatchUnchanged(t *testing.T) {
	t.Parallel()

	// the other lookups keep the flat threshold of five edits
	got, ok := levenshteinFindBestMatch("EPL", [][]string{{"Replay"}}, func(s []string) []string { return s })
	assert.True(t, ok)
	assert.Equal(t, "Replay", got[0])
}
