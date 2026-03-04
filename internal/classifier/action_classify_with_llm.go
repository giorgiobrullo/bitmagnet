package classifier

import (
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/classification"
	"github.com/bitmagnet-io/bitmagnet/internal/classifier/parsers"
	"github.com/bitmagnet-io/bitmagnet/internal/llm"
	"github.com/bitmagnet-io/bitmagnet/internal/model"
)

const classifyWithLLMName = "classify_with_llm"

type classifyWithLLMAction struct{}

func (classifyWithLLMAction) name() string {
	return classifyWithLLMName
}

var classifyWithLLMPayloadSpec = payloadLiteral[string]{
	literal:     classifyWithLLMName,
	description: "Use an LLM to classify the torrent name into a content type, title, and year",
}

func (classifyWithLLMAction) compileAction(ctx compilerContext) (action, error) {
	if _, err := classifyWithLLMPayloadSpec.Unmarshal(ctx); err != nil {
		return action{}, ctx.error(err)
	}

	return action{
		run: func(ctx executionContext) (classification.Result, error) {
			cl := ctx.result
			if ctx.llmClient == nil {
				return cl, classification.ErrUnmatched
			}

			input := llm.ClassifyInput{
				Name: parsers.SanitizeTorrentName(ctx.torrent.Name),
			}
			for _, f := range ctx.torrent.Files {
				ext := ""
				if f.Extension.Valid {
					ext = f.Extension.String
				}
				input.Files = append(input.Files, llm.FileInfo{
					Path:      f.Path,
					Extension: ext,
					Size:      f.Size,
				})
			}

			result, err := ctx.llmClient.Classify(ctx.Context, input)
			if err != nil {
				ctx.logger.Infow("llm classify error", "error", err)
				return cl, classification.ErrUnmatched
			}

			if result.Confidence < ctx.llmMinConfidence {
				ctx.logger.Infow("llm confidence too low",
					"type", result.Type,
					"title", result.Title,
					"confidence", result.Confidence,
					"threshold", ctx.llmMinConfidence)
				return cl, classification.ErrUnmatched
			}

			contentType, parseErr := model.ParseContentType(result.Type)
			if parseErr != nil {
				ctx.logger.Infow("llm returned invalid content type",
					"type", result.Type,
					"error", parseErr)
				return cl, classification.ErrUnmatched
			}

			ctx.logger.Infow("llm classified",
				"type", contentType,
				"title", result.Title,
				"year", result.Year,
				"confidence", result.Confidence)

			// Only update the content type if it isn't already set.
			// When called for title extraction (content type already determined
			// by a previous pipeline step), preserve the existing type.
			if !cl.ContentType.Valid {
				// Reject xxx from LLM: xxx detection has dedicated pipeline steps
				// (keyword matching, JAV detection) that run before the LLM.
				// The LLM is unreliable for xxx classification and produces
				// false positives (e.g., music/anime misclassified as xxx).
				if contentType == model.ContentTypeXxx {
					ctx.logger.Infow("llm xxx classification rejected",
						"title", result.Title,
						"confidence", result.Confidence)
					return cl, classification.ErrUnmatched
				}
				cl.ContentType = model.NewNullContentType(contentType)
			}

			if result.Title != "" {
				cl.BaseTitle = model.NewNullString(result.Title)
			}

			if result.Year > 0 {
				cl.Date.Year = model.Year(result.Year)
			}

			return cl, nil
		},
	}, nil
}

func (classifyWithLLMAction) JSONSchema() JSONSchema {
	return classifyWithLLMPayloadSpec.JSONSchema()
}
