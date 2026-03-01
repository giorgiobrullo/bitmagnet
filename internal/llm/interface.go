package llm

import "context"

type Client interface {
	Classify(ctx context.Context, input ClassifyInput) (ClassifyResult, error)
}

type ClassifyInput struct {
	Name  string
	Files []FileInfo
}

type FileInfo struct {
	Path      string
	Extension string
	Size      uint
}

type ClassifyResult struct {
	Type       string  `json:"type"`
	Title      string  `json:"title"`
	Year       int     `json:"year"`
	Confidence float64 `json:"confidence"`
}
