import { db, initDb } from '../db/db.js';

initDb();

const existing = db.prepare('SELECT COUNT(*) as count FROM knowledge_base').get() as { count: number };
if (existing.count === 0) {
  const insert = db.prepare('INSERT INTO knowledge_base (topic, content, tags) VALUES (?, ?, ?)');
  insert.run('System Topology', 'Commander routes tasks to specialist agents and synthesizes outputs.', 'architecture,agents');
  insert.run('Memory Protocol', 'Each agent receives last 5 memory entries and diary snippets under 200 tokens.', 'memory,context');
  insert.run('Quality Chain', 'Coder outputs are automatically reviewed by Critic before final synthesis.', 'workflow,qa');
  console.log('Seeded 3 knowledge base facts.');
} else {
  console.log('Knowledge base already seeded.');
}
