# nikzad.io

[![Spotify Listening History Synchronizer](https://github.com/nikzadkhani/nikzadio/actions/workflows/spotify-cron.yml/badge.svg)](https://github.com/nikzadkhani/nikzadio/actions/workflows/spotify-cron.yml)

Personal portfolio site at [nikzad.io](https://nikzad.io).

## Stack

```
Frontend:   Next.js + React 19 + Tailwind CSS v4
Backend:    Go (serverless on Vercel)
Data:       Protocol Buffers + TOML + Neon (Postgres) + Drizzle ORM
Testing:    Vitest + React Testing Library
Automation: GitHub Actions
Deploy:     Vercel
```

## Features

- Portfolio site with experience, projects, and publications
- MCP server exposing resume data as structured tools for AI clients (Claude Desktop, etc.)
- Spotify listening history synced to a Neon database via a GitHub Actions cron job

## Local Development

```bash
pnpm install
pnpm dev
pnpm test
```

## MCP Tools

Connect via the "Connect to Claude" button on the site. Available tools:

- `get_bio`, `get_jobs`, `get_education`, `get_skills`, `get_publications`

## License

MIT
