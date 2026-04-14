import { create } from 'zustand';

type KBEntry = {
  id: number;
  topic: string;
  content: string;
  tags: string;
  created_at: string;
};

type KnowledgeState = {
  entries: KBEntry[];
  query: string;
  setEntries: (entries: KBEntry[]) => void;
  addEntry: (entry: KBEntry) => void;
  setQuery: (query: string) => void;
};

export const useKnowledgeStore = create<KnowledgeState>((set) => ({
  entries: [],
  query: '',
  setEntries: (entries) => set({ entries }),
  addEntry: (entry) => set((state) => ({ entries: [entry, ...state.entries] })),
  setQuery: (query) => set({ query })
}));
