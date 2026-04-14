import { create } from 'zustand';

export type Task = {
  id: number;
  agent_id: string;
  task: string;
  status: 'pending' | 'active' | 'done' | 'error';
  result?: string;
  created_at?: string;
  stream?: string;
};

type TaskState = {
  tasks: Task[];
  upsertTask: (task: Partial<Task> & { id: number }) => void;
  appendToken: (taskId: number, token: string) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  upsertTask: (task) =>
    set((state) => {
      const idx = state.tasks.findIndex((t) => t.id === task.id);
      if (idx === -1) return { tasks: [{ ...task } as Task, ...state.tasks] };
      const updated = [...state.tasks];
      updated[idx] = { ...updated[idx], ...task };
      return { tasks: updated };
    }),
  appendToken: (taskId, token) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, stream: `${t.stream ?? ''}${token}` } : t
      )
    }))
}));
