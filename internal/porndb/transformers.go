package porndb

import (
	"strconv"
	"strings"

	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const SourcePorndb = "porndb"

func SceneResultToContentModel(scene SceneResult) model.Content {
	releaseDate := model.Date{}
	if scene.Date != "" {
		parsedDate, err := model.NewDateFromIsoString(scene.Date)
		if err == nil {
			releaseDate = parsedDate
		}
	}

	releaseYear := releaseDate.Year

	var collections []model.ContentCollection
	if scene.Site != nil && scene.Site.Name != "" {
		collections = append(collections, model.ContentCollection{
			Type:   "studio",
			Source: SourcePorndb,
			ID:     strconv.Itoa(scene.Site.ID),
			Name:   scene.Site.Name,
		})
	}

	var attributes []model.ContentAttribute
	if scene.Poster != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourcePorndb,
			Key:    "poster_url",
			Value:  scene.Poster,
		})
	}
	if scene.Background != nil && scene.Background.Full != "" {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourcePorndb,
			Key:    "backdrop_url",
			Value:  scene.Background.Full,
		})
	}

	var runtime model.NullUint16
	if scene.Duration != nil && *scene.Duration > 0 {
		runtime = model.NullUint16{Uint16: uint16(*scene.Duration), Valid: true}
	}

	var performerNames []string
	for _, p := range scene.Performers {
		performerNames = append(performerNames, p.Name)
	}
	if len(performerNames) > 0 {
		attributes = append(attributes, model.ContentAttribute{
			Source: SourcePorndb,
			Key:    "performers",
			Value:  strings.Join(performerNames, ", "),
		})
	}

	return model.Content{
		Type:        model.ContentTypeXxx,
		Source:      SourcePorndb,
		ID:          scene.ID,
		Title:       scene.Title,
		ReleaseDate: releaseDate,
		ReleaseYear: releaseYear,
		Adult:       model.NewNullBool(true),
		Runtime:     runtime,
		Collections: collections,
		Attributes:  attributes,
	}
}
