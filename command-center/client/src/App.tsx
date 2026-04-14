import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import AgentRoster from './components/AgentRoster';
import ChatPanel from './components/ChatPanel';
import KnowledgeBase from './components/KnowledgeBase';
import TaskQueue from './components/TaskQueue';
import CommanderBanner from './components/Commander';
import { useAgentStore } from './store/agentStore';
import { useTaskStore } from './store/taskStore';
import { useAgentStream } from './hooks/useAgentStream';

export default function App() {
  const setAgents = useAgentStore((s) => s.setAgents);
  const agents = useAgentStore((s) => s.agents);
  const setTasks = useTaskStore((s) => s.setTasks);

  useAgentStream();

  const agentsQuery = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const r = await fetch('/api/agents');
      return r.json();
    },
    refetchInterval: 10000
  });

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const r = await fetch('/api/tasks');
      return r.json();
    },
    refetchInterval: 5000
  });

  useEffect(() => {
    if (agentsQuery.data) setAgents(agentsQuery.data);
  }, [agentsQuery.data, setAgents]);

  useEffect(() => {
    if (tasksQuery.data) setTasks(tasksQuery.data);
  }, [setTasks, tasksQuery.data]);

  return (
    <div className="min-h-screen p-4">
      <CommanderBanner online={agents.length} />
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2"><AgentRoster /></div>
        <div className="col-span-7"><ChatPanel /></div>
        <div className="col-span-3"><KnowledgeBase /></div>
      </div>
      <div className="mt-3"><TaskQueue /></div>
    </div>
  );
}
