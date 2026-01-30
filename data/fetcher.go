// Package data loads and caches resume data from embedded TOML files.
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

//go:embed bio.toml
var bioToml []byte

//go:embed jobs.toml
var jobsToml []byte

//go:embed education.toml
var educationToml []byte

//go:embed skills.toml
var skillsToml []byte

//go:embed publications.toml
var publicationsToml []byte

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

// loadResumeFromTOML parses the embedded TOML files into the Resume proto struct.
// It uses a shadow struct to handle string-to-enum mapping for Categories.
func loadResumeFromTOML() (*Resume, error) {
	type skillGroupShadow struct {
		Category string   `toml:"category"`
		Names    []string `toml:"names"`
	}

	// Parse bio.toml
	type bioShadow struct {
		Name  string `toml:"name"`
		Title string `toml:"title"`
		Bio   string `toml:"bio"`
	}
	var bio bioShadow
	err := toml.Unmarshal(bioToml, &bio)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal bio.toml: %w", err)
	}

	// Parse jobs.toml
	type jobsShadow struct {
		Jobs []*Job `toml:"jobs"`
	}
	var jobs jobsShadow
	err = toml.Unmarshal(jobsToml, &jobs)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal jobs.toml: %w", err)
	}

	// Parse education.toml
	type educationShadow struct {
		Education []*Education `toml:"education"`
	}
	var education educationShadow
	err = toml.Unmarshal(educationToml, &education)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal education.toml: %w", err)
	}

	// Parse publications.toml
	type publicationsShadow struct {
		Publications []*Publication `toml:"publications"`
	}
	var publications publicationsShadow
	err = toml.Unmarshal(publicationsToml, &publications)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal publications.toml: %w", err)
	}

	// Parse skills.toml
	type skillsShadow struct {
		Skills []*skillGroupShadow `toml:"skills"`
	}
	var skills skillsShadow
	err = toml.Unmarshal(skillsToml, &skills)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal skills.toml: %w", err)
	}

	// Map to Proto
	res := &Resume{
		Name:         bio.Name,
		Title:        bio.Title,
		Bio:          bio.Bio,
		Jobs:         jobs.Jobs,
		Education:    education.Education,
		Publications: publications.Publications,
	}

	for _, s := range skills.Skills {
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
