package jikan

import (
	"context"
	"encoding/json"
	"strings"
	"testing"

	"github.com/go-resty/resty/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type fakeRequester struct {
	body   string
	path   string
	params map[string]string
}

func (f *fakeRequester) Request(_ context.Context, path string, queryParams map[string]string, result any) (*resty.Response, error) {
	f.path = path
	f.params = queryParams
	return nil, json.Unmarshal([]byte(f.body), result)
}

func TestSearchAnimeMal(t *testing.T) {
	t.Parallel()

	r := &fakeRequester{body: `{"data":[{"node":{
		"id": 5114,
		"title": "Hagane no Renkinjutsushi: Fullmetal Alchemist",
		"alternative_titles": {"synonyms": ["FMA"], "en": "Fullmetal Alchemist: Brotherhood", "ja": "鋼の錬金術師"},
		"start_date": "2009-04-05",
		"num_episodes": 64,
		"media_type": "tv",
		"main_picture": {"medium": "https://example.com/m.jpg", "large": "https://example.com/l.jpg"},
		"genres": [{"id": 1, "name": "Action"}],
		"studios": [{"id": 4, "name": "Bones"}]
	}}],"paging":{}}`}
	c := client{requester: r, mal: true}

	resp, err := c.SearchAnime(context.Background(), SearchAnimeRequest{Query: "Fullmetal Alchemist"})
	require.NoError(t, err)

	assert.Equal(t, "/anime", r.path)
	assert.Equal(t, "Fullmetal Alchemist", r.params["q"])
	assert.Equal(t, "10", r.params["limit"])
	assert.Contains(t, r.params["fields"], "alternative_titles")

	require.Len(t, resp.Data, 1)
	assert.Equal(t, AnimeResult{
		MalID:         5114,
		Title:         "Hagane no Renkinjutsushi: Fullmetal Alchemist",
		TitleEnglish:  "Fullmetal Alchemist: Brotherhood",
		TitleJapanese: "鋼の錬金術師",
		Type:          "TV",
		Episodes:      64,
		Year:          2009,
		Images: AnimeImages{JPG: ImageURLs{
			ImageURL:      "https://example.com/m.jpg",
			LargeImageURL: "https://example.com/l.jpg",
		}},
		Studios: []NamedEntry{{MalID: 4, Name: "Bones"}},
		Genres:  []NamedEntry{{MalID: 1, Name: "Action"}},
	}, resp.Data[0])
}

func TestSearchAnimeMalSkipsShortQuery(t *testing.T) {
	t.Parallel()

	r := &fakeRequester{}
	c := client{requester: r, mal: true}

	resp, err := c.SearchAnime(context.Background(), SearchAnimeRequest{Query: " K "})
	require.NoError(t, err)
	assert.Empty(t, resp.Data)
	assert.Empty(t, r.path, "no request for a query MAL would reject")
}

func TestMalQuery(t *testing.T) {
	t.Parallel()

	q, ok := malQuery("abc")
	assert.True(t, ok)
	assert.Equal(t, "abc", q)

	_, ok = malQuery("ab")
	assert.False(t, ok)

	_, ok = malQuery("進撃")
	assert.False(t, ok, "length counts characters, not bytes")

	long := strings.Repeat("word ", 20)
	q, ok = malQuery(long)
	assert.True(t, ok)
	assert.LessOrEqual(t, len([]rune(q)), malQueryMaxLength)
	assert.False(t, strings.HasSuffix(q, " "))
	assert.True(t, strings.HasSuffix(q, "word"), "cut at a word boundary")

	cjk := strings.Repeat("進撃の巨人", 20)
	q, ok = malQuery(cjk)
	assert.True(t, ok)
	assert.Len(t, []rune(q), malQueryMaxLength)
}
