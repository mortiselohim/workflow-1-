import { Router } from 'express';
import { db } from '../db/db.js';

export const knowledgeRouter = Router();

knowledgeRouter.get('/', (req, res) => {
  const q = String(req.query.q || '').trim().toLowerCase();
  const rows = q
    ? db
        .prepare(
          `SELECT * FROM knowledge_base
           WHERE lower(topic) LIKE @q OR lower(content) LIKE @q OR lower(tags) LIKE @q
           ORDER BY created_at DESC`
        )
        .all({ q: `%${q}%` })
    : db.prepare('SELECT * FROM knowledge_base ORDER BY created_at DESC').all();
  res.json(rows);
});

knowledgeRouter.post('/', (req, res) => {
  const { topic, content, tags } = req.body as { topic: string; content: string; tags?: string };
  if (!topic || !content) return res.status(400).json({ error: 'topic and content required' });

  const result = db
    .prepare('INSERT INTO knowledge_base (topic, content, tags) VALUES (?, ?, ?)')
    .run(topic, content, tags ?? '');
  const row = db.prepare('SELECT * FROM knowledge_base WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(row);
});
