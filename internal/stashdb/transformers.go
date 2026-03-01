package stashdb

import (
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourceStashdb = "stashdb"

func SceneResultToContentModel(scene SceneResult) model.Content {
	releaseDate := model.Date{}
	if scene.ReleaseDate != "" {
		parsedDate, err := model.NewDateFromIsoString(scene.ReleaseDate)
		if err == nil {
			releaseDate = parsedDate
		}
	}

	var collections []model.ContentCollection
	if scene.Studio != nil && scene.Studio.Name != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "studio",
			Source: SourceStashdb,
			ID:     scene.Studio.ID,
			Name:   scene.Studio.Name,
		})
	}

	var attributes []model.ContentAttribute
	attributes = append(attributes, model.ContentAttribute{
		Source: SourceStashdb,
		Key:    "id",
		Value:  scene.ID,
	})

	if len(scene.Images) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceStashdb,
			Key:    "poster_url",
			Value:  scene.Images[0].URL,
		})
	}

	var performerNames []string
	for _, p := range scene.Performers {
		performerNames = append(performerNames, p.Performer.Name)
	}
	if len(performerNames) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourceStashdb,
			Key:    "performers",
			Value:  strings.Join(performerNames, ", "),
		})
	}

	return model.Content{
		Type:        model.ContentTypeXxx,
		Source:      SourceStashdb,
		ID:          scene.ID,
		Title:       scene.Title,
		ReleaseDate: releaseDate,
		ReleaseYear: releaseDate.Year,
		Adult:       model.NewNullBool(true),
		Runtime:     model.NullUint16{Uint16: uint16(scene.Duration), Valid: scene.Duration > 0},
		Collections: collections,
		Attributes:  attributes,
	}
}
