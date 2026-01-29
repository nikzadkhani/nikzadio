// Package data loads and caches resume data from an embedded TOML file.
// It provides a singleton accessor pattern with thread-safe lazy initialization
// using sync.RWMutex for efficient concurrent read access.
package data

import (
	_ "embed"
	"fmt"
	"log"
	"sync"

	"github.com/pelletier/go-toml/v2"
)

//go:embed resume.toml
var resumeToml []byte

var (
	cache      *Resume
	cacheMutex sync.RWMutex
)

// GetResumeData returns the resume data, using cache if available, or loading from embedded TOML.
func GetResumeData() *Resume {
	cacheMutex.RLock()
	if cache != nil {
		defer cacheMutex.RUnlock()
		return cache
	}
	cacheMutex.RUnlock()

	data, err := loadResumeFromTOML()
	if err != nil {
		log.Printf("Error loading resume from TOML: %v. Using empty data.", err)
		return &Resume{}
	}

	cacheMutex.Lock()
	cache = data
	cacheMutex.Unlock()

	return data
}

// loadResumeFromTOML parses the embedded TOML file into the Resume proto struct.
// It uses a shadow struct to handle string-to-enum mapping for Categories.
func loadResumeFromTOML() (*Resume, error) {
	type skillGroupShadow struct {
		Category string   `toml:"category"`
		Names    []string `toml:"names"`
	}
	type resumeShadow struct {
		Name         string              `toml:"name"`
		Title        string              `toml:"title"`
		Bio          string              `toml:"bio"`
		Jobs         []*Job              `toml:"jobs"`
		Education    []*Education        `toml:"education"`
		Publications []*Publication      `toml:"publications"`
		Skills       []*skillGroupShadow `toml:"skills"`
	}

	var shadow resumeShadow
	err := toml.Unmarshal(resumeToml, &shadow)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal TOML: %w", err)
	}

	// Map shadow to Proto
	res := &Resume{
		Name:         shadow.Name,
		Title:        shadow.Title,
		Bio:          shadow.Bio,
		Jobs:         shadow.Jobs,
		Education:    shadow.Education,
		Publications: shadow.Publications,
	}

	for _, s := range shadow.Skills {
		cat, ok := Category_value[s.Category]
		if !ok {
			log.Printf("Warning: unknown skill category %q", s.Category)
			cat = int32(Category_CATEGORY_UNSPECIFIED)
		}
		res.Skills = append(res.Skills, &SkillGroup{
			Category: Category(cat),
			Names:    s.Names,
		})
	}

	return res, nil
}
