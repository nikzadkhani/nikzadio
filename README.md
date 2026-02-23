# nikzad.io

My personal website + a slightly over-engineered resume API that lets AI agents query my work history. Because why not? 🤷‍♂️

## What's This?

It's a portfolio site built with Next.js, but with a twist: there's a Go-powered API backend that speaks [MCP (Model Context Protocol)](https://modelcontextprotocol.io). This means Claude Desktop (or any other MCP client) can fetch my resume data through function calls instead of just reading text.

Is it practical? Probably not. Is it cool? Absolutely.

## The Fun Stuff

- **Portfolio Site**: Next.js website with my experience, projects, and publications
- **MCP Server**: Go serverless functions that expose resume data via structured tools
- **Type Safety**: Protocol Buffers for the resume schema because I care about data integrity
- **Spotify Sync**: GitHub Action cron job that records my listening history to a Neon database every 15 minutes
- **Pretty Animations**: Framer Motion makes things swoosh nicely
- **Dark Mode**: Obviously

## Tech Stack

```
Frontend:  Next.js + React 19 + Tailwind CSS v4
Backend:   Go (serverless on Vercel)
Data:      Protocol Buffers + TOML + Neon (Postgres) + Drizzle ORM
Testing:   Vitest + React Testing Library
Automation: GitHub Actions
Deploy:    Vercel
```

## Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## The MCP Thing

The site has a "Connect to Claude" button that shows you how to hook up the resume API to Claude Desktop. Once connected, Claude can call functions like:

- `get_bio` - Who am I?
- `get_jobs` - Where have I worked?
- `get_education` - What did I study?
- `get_skills` - What can I do?
- `get_publications` - What have I published?

Try it at [nikzad.io](https://nikzad.io) if you want to see it in action.

## Why Protocol Buffers for a Resume?

Great question. The answer is "why not?"

But seriously, it enforces a schema, generates type-safe code for both Go and TypeScript, and makes me feel fancy. Plus it's fun to say "my resume is a protobuf message."

## License

MIT - do whatever you want with it
