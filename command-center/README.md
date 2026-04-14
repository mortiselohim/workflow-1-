# AI Command Center (Live Prototype)

A full-stack, browser-based AI Command Center with 5 orchestrated agents, live token streaming, SQLite-backed memory, task queueing, and a shared knowledge base.

## Stack
- Frontend: React 18 + TypeScript + Vite + Tailwind + Zustand + React Query
- Backend: Node + Express + Socket.io + better-sqlite3
- LLM: Anthropic SDK with `claude-sonnet-4-20250514`

## Project Structure

```
command-center/
  client/src/... 
  server/... 
```

## Setup
1. Copy env file:
   ```bash
   cp .env.example .env
   ```
2. Add your `ANTHROPIC_API_KEY` in `.env`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Seed initial knowledge base facts:
   ```bash
   npm run seed
   ```
5. Start everything:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173`

## Runtime Notes
- On server boot, SQLite schema is initialized from `server/db/schema.sql`.
- Agent context injection uses:
  `AGENT_CTX: {agent_id} | LAST_TASKS: [...] | KB_FACTS: [...] | DIARY: [...]`
- Each agent call only loads the last 5 memory and diary entries.
- Commander mode auto-routes tasks; Manual mode pins a specific agent.
- Coder tasks auto-chain to Critic for quality review.

## API Overview
- `GET /api/agents`
- `GET /api/agents/:agentId/diary`
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/knowledge?q=...`
- `POST /api/knowledge`

## WebSocket Events
- `agent:status`
- `task:update`
- `task:token`
