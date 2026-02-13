package data

//go:generate protoc --proto_path=../proto --go_out=../generated --go_opt=paths=source_relative --validate_out=lang=go,paths=source_relative:../generated ../proto/resume.proto
//go:generate protoc --proto_path=../proto --plugin=../node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=../generated --ts_proto_opt=esModuleInterop=true ../proto/resume.proto

//go:generate node ../scripts/toml-to-json.js

import (
	_ "github.com/pelletier/go-toml/v2"
)
