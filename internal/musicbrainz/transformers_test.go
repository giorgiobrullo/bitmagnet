package musicbrainz

import (
	"testing"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
	"github.com/stretchr/testify/assert"
)

func TestReleaseResultToContentModel(t *testing.T) {
	t.Parallel()

	t.Run("full result with artist and label", func(t *testing.T) {
		release := ReleaseResult{
			ID:    "abc-123",
			Title: "OK Computer",
			Date:  "1997-06-16",
			ArtistCredit: []ArtistCredit{
				{Name: "Radiohead"},
			},
			ReleaseGroup: &ReleaseGroup{
				ID:          "rg-1",
				PrimaryType: "Album",
			},
			LabelInfo: []LabelInfo{
				{Label: &Label{ID: "lbl-1", Name: "Parlophone"}},
			},
		}

		content := ReleaseResultToContentModel(release)

		assert.Equal(t, model.ContentTypeMusic, content.Type)
		assert.Equal(t, "musicbrainz", content.Source)
		assert.Equal(t, "abc-123", content.ID)
		assert.Equal(t, "Radiohead - OK Computer", content.Title)
		assert.Equal(t, model.Year(1997), content.ReleaseYear)
		assert.Len(t, content.Collections, 2)
		assert.Equal(t, "release_type", content.Collections[0].Type)
		assert.Equal(t, "Album", content.Collections[0].Name)
		assert.Equal(t, "label", content.Collections[1].Type)
		assert.Equal(t, "Parlophone", content.Collections[1].Name)
	})

	t.Run("multiple artists with join phrases", func(t *testing.T) {
		release := ReleaseResult{
			ID:    "xyz-789",
			Title: "Watch the Throne",
			Date:  "2011-08-08",
			ArtistCredit: []ArtistCredit{
				{Name: "Jay-Z", JoinPhrase: " & "},
				{Name: "Kanye West"},
			},
		}

		content := ReleaseResultToContentModel(release)

		assert.Equal(t, "Jay-Z & Kanye West - Watch the Throne", content.Title)
	})

	t.Run("no artist", func(t *testing.T) {
		release := ReleaseResult{
			ID:    "solo-1",
			Title: "Unknown Album",
		}

		content := ReleaseResultToContentModel(release)

		assert.Equal(t, "Unknown Album", content.Title)
	})
}
