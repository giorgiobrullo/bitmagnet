package musicbrainz

import (
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceMusicbrainz = "musicbrainz"

func ReleaseResultToContentModel(release ReleaseResult) model.Content {
	releaseDate := model.Date{}
	if release.Date != "" {
		parsedDate, err := model.NewDateFromIsoString(release.Date)
		if err == nil {
			releaseDate = parsedDate
		}
	}

	var collections []model.ContentCollection
	if release.ReleaseGroup != nil && release.ReleaseGroup.PrimaryType != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "release_type",
			Source: SourceMusicbrainz,
			ID:     release.ReleaseGroup.ID,
			Name:   release.ReleaseGroup.PrimaryType,
		})
	}
	for _, li := range release.LabelInfo {
		if li.Label != nil && li.Label.Name != "" {
			collections = append(collections, model.ContentCollection{
				Type:   "label",
				Source: SourceMusicbrainz,
				ID:     li.Label.ID,
				Name:   li.Label.Name,
			})
		}
	}

	var attributes []model.ContentAttribute
	attributes = append(attributes, model.ContentAttribute{
		Source: SourceMusicbrainz,
		Key:    "id",
		Value:  release.ID,
	})

	if release.Barcode != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMusicbrainz,
			Key:    "barcode",
			Value:  release.Barcode,
		})
	}

	if release.ReleaseGroup != nil {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMusicbrainz,
			Key:    "release_group_id",
			Value:  release.ReleaseGroup.ID,
		})
	}

	// Build artist string.
	var artistParts []string
	for _, ac := range release.ArtistCredit {
		artistParts = append(artistParts, ac.Name+ac.JoinPhrase)
	}
	if len(artistParts) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceMusicbrainz,
			Key:    "artist",
			Value:  strings.Join(artistParts, ""),
		})
	}

	// Use "Artist - Title" as the content title if we have an artist.
	title := release.Title
	if len(artistParts) > 0 {
		title = strings.Join(artistParts, "") + " - " + release.Title
	}

	return model.Content{
		Type:        model.ContentTypeMusic,
		Source:      SourceMusicbrainz,
		ID:          release.ID,
		Title:       title,
		ReleaseDate: releaseDate,
		ReleaseYear: releaseDate.Year,
		Collections: collections,
		Attributes:  attributes,
	}
}
