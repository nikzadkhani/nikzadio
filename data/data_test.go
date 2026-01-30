package data

import (
	"testing"
)

func TestResumeDataValidity(t *testing.T) {
	resume, err := loadResumeFromTOML()
	if err != nil {
		t.Fatalf("Failed to load resume from TOML: %v", err)
	}

	// Use auto-generated validation from protoc-gen-validate
	if err := resume.Validate(); err != nil {
		t.Fatalf("Resume validation failed: %v", err)
	}

	t.Logf("Successfully validated resume for: %s", resume.Name)
}
