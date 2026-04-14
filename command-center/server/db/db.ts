import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'command-center', 'server', 'db', 'command-center.sqlite');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);

export function initDb() {
  const schemaPath = path.resolve(process.cwd(), 'command-center', 'server', 'db', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
}

export type AgentStatus = 'idle' | 'thinking' | 'responding' | 'error';

export type AgentId = 'commander' | 'researcher' | 'coder' | 'analyst' | 'critic';

export const AGENTS: { id: AgentId; name: string; role: string; systemPrompt: string }[] = [
  {
    id: 'commander',
    name: 'Commander',
    role: 'Orchestrator',
    systemPrompt:
      'You are Commander. You route work, synthesize multi-agent results, and maintain strategic context. Respond with concise tactical plans.'
  },
  {
    id: 'researcher',
    name: 'Researcher',
    role: 'Evidence Scout',
    systemPrompt:
      'You are Researcher. Provide sourced reasoning, call out uncertainty, and explain the logic path clearly.'
  },
  {
    id: 'coder',
    name: 'Coder',
    role: 'Software Engineer',
    systemPrompt:
      'You are Coder. Write, review, and explain production-ready code with clear assumptions and test notes.'
  },
  {
    id: 'analyst',
    name: 'Analyst',
    role: 'Pattern Analyst',
    systemPrompt:
      'You are Analyst. Parse data, find patterns, summarize trends, and quantify confidence when possible.'
  },
  {
    id: 'critic',
    name: 'Critic',
    role: 'Quality Reviewer',
    systemPrompt:
      'You are Critic. Review outputs, flag risks, identify flaws, and provide concrete improvement actions.'
  }
];

export function getAgentMemory(agentId: AgentId) {
  return db
    .prepare('SELECT key, value, created_at FROM agent_memory WHERE agent_id = ? ORDER BY created_at DESC LIMIT 5')
    .all(agentId) as { key: string; value: string; created_at: string }[];
}

export function getDiary(agentId: AgentId) {
  return db
    .prepare('SELECT entry FROM agent_diaries WHERE agent_id = ? ORDER BY timestamp DESC LIMIT 5')
    .all(agentId) as { entry: string }[];
}

export function getKnowledgeFacts(limit = 5) {
  return db
    .prepare('SELECT topic, content FROM knowledge_base ORDER BY created_at DESC LIMIT ?')
    .all(limit) as { topic: string; content: string }[];
}

export function makeAgentCtx(agentId: AgentId) {
  const memories = getAgentMemory(agentId)
    .map((m) => `${m.key}→${m.value.slice(0, 80)}`)
    .join(' | ');
  const facts = getKnowledgeFacts(3)
    .map((f) => `${f.topic}: ${f.content.slice(0, 60)}`)
    .join(' | ');
  const diary = getDiary(agentId)
    .map((d) => d.entry.slice(0, 60))
    .join(' | ');

  return `AGENT_CTX: ${agentId} | LAST_TASKS: [${memories}] | KB_FACTS: [${facts}] | DIARY: [${diary}]`;
}

export function logTask(agentId: AgentId, task: string, status: string, result = '') {
  const stmt = db.prepare('INSERT INTO task_log (agent_id, task, result, status) VALUES (?, ?, ?, ?)');
  return stmt.run(agentId, task, result, status).lastInsertRowid;
}

export function updateTask(id: number, status: string, result: string) {
  db.prepare('UPDATE task_log SET status = ?, result = ? WHERE id = ?').run(status, result, id);
}

export function addDiary(agentId: AgentId, entry: string) {
  db.prepare('INSERT INTO agent_diaries (agent_id, entry) VALUES (?, ?)').run(agentId, entry.slice(0, 400));
}

export function addMemory(agentId: AgentId, key: string, value: string) {
  db.prepare('INSERT INTO agent_memory (agent_id, key, value) VALUES (?, ?, ?)').run(agentId, key, value.slice(0, 500));
}
