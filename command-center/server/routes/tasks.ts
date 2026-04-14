import { Router } from 'express';
import type { Server as SocketIOServer } from 'socket.io';
import { runAgentStream } from '../agents/base.js';
import { routeTask } from '../agents/commander.js';
import { AgentId, db, logTask, updateTask } from '../db/db.js';

export function makeTaskRouter(io: SocketIOServer) {
  const tasksRouter = Router();

  tasksRouter.get('/', (_req, res) => {
    const rows = db.prepare('SELECT * FROM task_log ORDER BY id DESC LIMIT 100').all();
    res.json(rows);
  });

  tasksRouter.post('/', async (req, res) => {
    const { task, mode, pinnedAgent } = req.body as {
      task: string;
      mode: 'commander' | 'manual';
      pinnedAgent?: AgentId;
    };

    if (!task) return res.status(400).json({ error: 'task required' });

    const chosenAgent = mode === 'manual' && pinnedAgent ? pinnedAgent : routeTask(task);
    const taskId = Number(logTask(chosenAgent, task, 'pending'));

    res.status(202).json({ taskId, chosenAgent });

    io.emit('task:update', { id: taskId, agent_id: chosenAgent, task, status: 'active' });
    io.emit('agent:status', { agentId: chosenAgent, status: 'thinking' });

    try {
      const finalText = await runAgentStream(chosenAgent, task, {
        onToken: (token) => {
          io.emit('task:token', { taskId, agentId: chosenAgent, token });
          io.emit('agent:status', { agentId: chosenAgent, status: 'responding' });
        }
      });

      if (chosenAgent === 'coder') {
        const reviewTaskId = Number(logTask('critic', `Review this output:\n${finalText}`, 'pending'));
        io.emit('task:update', {
          id: reviewTaskId,
          agent_id: 'critic',
          task: `Review coder output for task ${taskId}`,
          status: 'active'
        });
        io.emit('agent:status', { agentId: 'critic', status: 'thinking' });

        const review = await runAgentStream('critic', `Review this coder output:\n${finalText}`, {
          onToken: (token) => io.emit('task:token', { taskId: reviewTaskId, agentId: 'critic', token })
        });
        updateTask(reviewTaskId, 'done', review);
        io.emit('task:update', { id: reviewTaskId, status: 'done', result: review, agent_id: 'critic' });
        io.emit('agent:status', { agentId: 'critic', status: 'idle' });
      }

      updateTask(taskId, 'done', finalText);
      io.emit('task:update', { id: taskId, status: 'done', result: finalText, agent_id: chosenAgent });
      io.emit('agent:status', { agentId: chosenAgent, status: 'idle' });
    } catch (error) {
      updateTask(taskId, 'error', String(error));
      io.emit('task:update', { id: taskId, status: 'error', result: String(error), agent_id: chosenAgent });
      io.emit('agent:status', { agentId: chosenAgent, status: 'error' });
    }
  });

  return tasksRouter;
}
