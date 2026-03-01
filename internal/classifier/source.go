package classifier

type Source struct {
	Schema            string          `json:"$schema,omitempty" yaml:"$schema,omitempty"`
	Workflows         workflowSources `json:"workflows"`
	FlagDefinitions   flagDefinitions `json:"flag_definitions"`
	Flags             Flags           `json:"flags"`
	Keywords          keywordGroups   `json:"keywords"`
	KeywordsOverride  keywordGroups   `json:"keywords_override"`
	Extensions        extensionGroups `json:"extensions"`
	ExtensionsOverride extensionGroups `json:"extensions_override"`
}

func (s Source) merge(other Source) (Source, error) {
	flagDefs, err := s.FlagDefinitions.merge(other.FlagDefinitions)
	if err != nil {
		return Source{}, err
	}

	return Source{
		FlagDefinitions: flagDefs,
		Flags:           s.Flags.merge(other.Flags),
		Keywords:        s.Keywords.merge(other.Keywords).applyOverrides(other.KeywordsOverride),
		Extensions:      s.Extensions.merge(other.Extensions).applyOverrides(other.ExtensionsOverride),
		Workflows:       s.Workflows.merge(other.Workflows),
	}, nil
}

func (s Source) workflowNames() map[string]struct{} {
	result := make(map[string]struct{})
	for k := range s.Workflows {
		result[k] = struct{}{}
	}

	return result
}

type keywordGroups map[string][]string

func (g keywordGroups) merge(other keywordGroups) keywordGroups {
	result := make(keywordGroups)

	for k, v := range g {
		if _, ok := other[k]; ok {
			result[k] = append(v, other[k]...)
		} else {
			result[k] = v
		}
	}

	for k, v := range other {
		if _, ok := result[k]; !ok {
			result[k] = v
		}
	}

	return result
}

func (g keywordGroups) applyOverrides(overrides keywordGroups) keywordGroups {
	if len(overrides) == 0 {
		return g
	}

	result := make(keywordGroups)
	for k, v := range g {
		if ov, ok := overrides[k]; ok {
			result[k] = ov
		} else {
			result[k] = v
		}
	}

	for k, v := range overrides {
		if _, ok := result[k]; !ok {
			result[k] = v
		}
	}

	return result
}

type extensionGroups map[string][]string

func (g extensionGroups) merge(other extensionGroups) extensionGroups {
	result := make(extensionGroups)

	for k, v := range g {
		if _, ok := other[k]; ok {
			result[k] = append(v, other[k]...)
		} else {
			result[k] = v
		}
	}

	for k, v := range other {
		if _, ok := result[k]; !ok {
			result[k] = v
		}
	}

	return result
}

func (g extensionGroups) applyOverrides(overrides extensionGroups) extensionGroups {
	if len(overrides) == 0 {
		return g
	}

	result := make(extensionGroups)
	for k, v := range g {
		if ov, ok := overrides[k]; ok {
			result[k] = ov
		} else {
			result[k] = v
		}
	}

	for k, v := range overrides {
		if _, ok := result[k]; !ok {
			result[k] = v
		}
	}

	return result
}

type workflowSources map[string]any

func (s workflowSources) merge(other workflowSources) workflowSources {
	result := make(workflowSources)
	for k, v := range s {
		result[k] = v
	}

	for k, v := range other {
		result[k] = v
	}

	return result
}
