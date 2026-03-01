package llm

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
)

type client struct {
	requester Requester
	model     string
}

// normalizeType maps common LLM output deviations to valid bitmagnet content type strings.
var normalizeType = map[string]string{
	"tvshow":    "tv_show",
	"tv show":   "tv_show",
	"tv":        "tv_show",
	"anime":     "tv_show",
	"adult":     "xxx",
	"porn":      "xxx",
	"book":      "ebook",
	"e-book":    "ebook",
	"audio":     "music",
	"audiobook": "audiobook",
	"game":      "game",
	"games":     "game",
	"app":       "software",
	"comics":    "comic",
}

const classifyPrompt = `You classify torrent names into content types. Output ONLY valid JSON, no other text.

{"type":"movie|tv_show|music|ebook|comic|audiobook|game|software|xxx|unknown","title":"clean english title","year":0,"confidence":0.0}

Rules:
- type: one of the listed values exactly
- title: the clean content title extracted from the torrent name, romanized to ASCII if needed
- year: release year as integer, 0 if unknown
- confidence: 0.0 to 1.0, how sure you are about the type classification
- The input may include sample filenames from the torrent after "Files:" — use these as extra signal for the content type

Examples:
Input: "[SubsPlease] Sousou no Frieren - 01 (1080p) [F02B7A7E].mkv"
Output: {"type":"tv_show","title":"Frieren Beyond Journeys End","year":2023,"confidence":0.95}

Input: "Опенгеймер.2023.D.BDRip.1080p"
Output: {"type":"movie","title":"Oppenheimer","year":2023,"confidence":0.95}

Input: "BTF7___1080_2025"
Output: {"type":"unknown","title":"","year":2025,"confidence":0.2}`

type chatRequest struct {
	Model    string        `json:"model,omitempty"`
	Messages []chatMessage `json:"messages"`
	// Disable Qwen3 thinking mode for faster responses.
	ChatTemplateKwargs *chatTemplateKwargs `json:"chat_template_kwargs,omitempty"`
}

type chatTemplateKwargs struct {
	EnableThinking bool `json:"enable_thinking"`
}

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func (c client) Classify(ctx context.Context, input ClassifyInput) (ClassifyResult, error) {
	userMsg := buildUserMessage(input)

	req := chatRequest{
		Model: c.model,
		Messages: []chatMessage{
			{Role: "system", Content: classifyPrompt},
			{Role: "user", Content: userMsg},
		},
		ChatTemplateKwargs: &chatTemplateKwargs{EnableThinking: false},
	}

	var resp chatResponse
	_, err := c.requester.Request(ctx, "/v1/chat/completions", req, &resp)
	if err != nil {
		return ClassifyResult{}, fmt.Errorf("LLM classify request failed: %w", err)
	}

	if len(resp.Choices) == 0 {
		return ClassifyResult{}, fmt.Errorf("LLM returned no choices")
	}

	content := strings.TrimSpace(resp.Choices[0].Message.Content)

	// Strip markdown code fences if present.
	content = stripCodeFences(content)

	var result ClassifyResult
	if err := json.Unmarshal([]byte(content), &result); err != nil {
		return ClassifyResult{}, fmt.Errorf("LLM returned invalid JSON %q: %w", content, err)
	}

	// Normalize the type string.
	result.Type = normalizeContentType(result.Type)

	return result, nil
}

const (
	maxFileSamples    = 5
	maxFilePathLength = 80
)

// buildUserMessage constructs the user prompt from the torrent name and file samples.
// When files are present, it appends a "Files:" section showing up to 5 representative
// file paths (truncated to 80 chars), picking samples from each unique extension.
func buildUserMessage(input ClassifyInput) string {
	if len(input.Files) == 0 {
		return input.Name
	}

	samples := selectFileSamples(input.Files)
	if len(samples) == 0 {
		return input.Name
	}

	var b strings.Builder
	b.WriteString(input.Name)
	b.WriteString("\nFiles:")
	for _, f := range samples {
		path := f.Path
		if len(path) > maxFilePathLength {
			path = path[:maxFilePathLength] + "..."
		}
		b.WriteString("\n- ")
		b.WriteString(path)
	}

	return b.String()
}

// selectFileSamples picks up to maxFileSamples files, ensuring at least one sample per
// unique extension before filling remaining slots with the largest files.
func selectFileSamples(files []FileInfo) []FileInfo {
	if len(files) <= maxFileSamples {
		return files
	}

	// First pass: collect one file per extension (pick the largest for each).
	byExt := make(map[string]FileInfo)
	for _, f := range files {
		ext := strings.ToLower(f.Extension)
		if ext == "" {
			ext = "(none)"
		}
		if existing, ok := byExt[ext]; !ok || f.Size > existing.Size {
			byExt[ext] = f
		}
	}

	// Add one sample per extension.
	selected := make(map[string]struct{})
	var result []FileInfo
	for _, f := range byExt {
		if len(result) >= maxFileSamples {
			break
		}
		result = append(result, f)
		selected[f.Path] = struct{}{}
	}

	// Fill remaining slots with the largest unselected files.
	if len(result) < maxFileSamples {
		// Sort by size descending — just pick the largest.
		for _, f := range files {
			if len(result) >= maxFileSamples {
				break
			}
			if _, ok := selected[f.Path]; ok {
				continue
			}
			result = append(result, f)
			selected[f.Path] = struct{}{}
		}
	}

	return result
}

func normalizeContentType(t string) string {
	lower := strings.ToLower(strings.TrimSpace(t))
	if mapped, ok := normalizeType[lower]; ok {
		return mapped
	}
	return lower
}

func stripCodeFences(s string) string {
	s = strings.TrimSpace(s)
	if strings.HasPrefix(s, "```") {
		// Remove opening fence line.
		if idx := strings.Index(s, "\n"); idx >= 0 {
			s = s[idx+1:]
		}
		// Remove closing fence.
		if idx := strings.LastIndex(s, "```"); idx >= 0 {
			s = s[:idx]
		}
		s = strings.TrimSpace(s)
	}
	return s
}
