import { create } from 'zustand';

export type AgentStatus = 'idle' | 'thinking' | 'responding' | 'error';
export type AgentId = 'commander' | 'researcher' | 'coder' | 'analyst' | 'critic';

export type Agent = {
  id: AgentId;
  name: string;
  role: string;
  status: AgentStatus;
  lastActive: string | null;
};

type AgentState = {
  agents: Agent[];
  focusedAgent: AgentId | 'all';
  mode: 'commander' | 'manual';
  pinnedAgent: AgentId;
  setAgents: (agents: Agent[]) => void;
  setFocusedAgent: (agent: AgentId | 'all') => void;
  setAgentStatus: (agentId: AgentId, status: AgentStatus) => void;
  setMode: (mode: 'commander' | 'manual') => void;
  setPinnedAgent: (agent: AgentId) => void;
};

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  focusedAgent: 'all',
  mode: 'commander',
  pinnedAgent: 'researcher',
  setAgents: (agents) =>
    set(() => ({
      agents: agents.map((a) => ({ ...a, status: a.status ?? 'idle' }))
    })),
  setFocusedAgent: (focusedAgent) => set({ focusedAgent }),
  setAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === agentId ? { ...a, status } : a))
    })),
  setMode: (mode) => set({ mode }),
  setPinnedAgent: (pinnedAgent) => set({ pinnedAgent })
}));
