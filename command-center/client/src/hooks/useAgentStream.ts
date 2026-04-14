import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAgentStore } from '../store/agentStore';
import { useTaskStore } from '../store/taskStore';

const socket = io('/', { path: '/socket.io' });

export function useAgentStream() {
  const setAgentStatus = useAgentStore((s) => s.setAgentStatus);
  const upsertTask = useTaskStore((s) => s.upsertTask);
  const appendToken = useTaskStore((s) => s.appendToken);

  useEffect(() => {
    const onStatus = (payload: { agentId: any; status: any }) => setAgentStatus(payload.agentId, payload.status);
    const onTask = (payload: any) => upsertTask(payload);
    const onToken = (payload: { taskId: number; token: string }) => appendToken(payload.taskId, payload.token);

    socket.on('agent:status', onStatus);
    socket.on('task:update', onTask);
    socket.on('task:token', onToken);

    return () => {
      socket.off('agent:status', onStatus);
      socket.off('task:update', onTask);
      socket.off('task:token', onToken);
    };
  }, [appendToken, setAgentStatus, upsertTask]);
}
