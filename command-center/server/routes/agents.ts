import { Router } from 'express';
import { AGENTS, db } from '../db/db.js';

export const agentsRouter = Router();

agentsRouter.get('/', (_req, res) => {
  const lastActiveStmt = db.prepare(
    'SELECT created_at FROM task_log WHERE agent_id = ? ORDER BY created_at DESC LIMIT 1'
  );

  const agents = AGENTS.map((a) => {
    const row = lastActiveStmt.get(a.id) as { created_at?: string } | undefined;
    return { ...a, lastActive: row?.created_at ?? null };
  });

  res.json(agents);
});

agentsRouter.get('/:agentId/diary', (req, res) => {
  const rows = db
    .prepare('SELECT entry, timestamp FROM agent_diaries WHERE agent_id = ? ORDER BY timestamp DESC LIMIT 12')
    .all(req.params.agentId);
  res.json(rows);
});
