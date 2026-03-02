package deezer

import (
	"strconv"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceDeezer = "deezer"

func AlbumResultToContentModel(album AlbumResult) model.Content {
	title := album.Title
	if album.Artist.Name != "" {
		title = album.Artist.Name + " - " + album.Title
	}

	var attributes []model.ContentAttribute
	attributes = append(attributes, model.ContentAttribute{
		Source: SourceDeezer,
		Key:    "id",
		Value:  strconv.Itoa(album.ID),
	})
	if album.Artist.Name != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceDeezer,
			Key:    "artist",
			Value:  album.Artist.Name,
		})
	}
	if album.RecordType != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceDeezer,
			Key:    "record_type",
			Value:  album.RecordType,
		})
	}

	return model.Content{
		Type:       model.ContentTypeMusic,
		Source:     SourceDeezer,
		ID:         strconv.Itoa(album.ID),
		Title:      title,
		Attributes: attributes,
	}
}
