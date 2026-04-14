import { useMemo } from 'react';
import { useTaskStore } from '../store/taskStore';

export function useTaskQueue() {
  const tasks = useTaskStore((s) => s.tasks);

  return useMemo(() => {
    const pending = tasks.filter((t) => t.status === 'pending');
    const active = tasks.filter((t) => t.status === 'active');
    const done = tasks.filter((t) => t.status === 'done');
    return { tasks, pending, active, done };
  }, [tasks]);
}
