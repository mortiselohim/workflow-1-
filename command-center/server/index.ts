import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { initDb } from './db/db.js';
import { agentsRouter } from './routes/agents.js';
import { knowledgeRouter } from './routes/knowledge.js';
import { makeTaskRouter } from './routes/tasks.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

initDb();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/agents', agentsRouter);
app.use('/api/knowledge', knowledgeRouter);
app.use('/api/tasks', makeTaskRouter(io));

io.on('connection', (socket) => {
  socket.emit('server:ready', { ok: true, ts: new Date().toISOString() });
});

const port = Number(process.env.PORT || 4000);
httpServer.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
