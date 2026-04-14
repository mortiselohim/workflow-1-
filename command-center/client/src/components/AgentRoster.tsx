import AgentCard from './AgentCard';
import { useAgentStore } from '../store/agentStore';

export default function AgentRoster() {
  const { agents, focusedAgent, setFocusedAgent } = useAgentStore();

  return (
    <aside className="space-y-2 rounded border border-zinc-700 bg-zinc-900 p-3">
      <h2 className="text-sm font-bold text-zinc-300">Agent Roster</h2>
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          selected={focusedAgent === agent.id}
          onClick={() => setFocusedAgent(agent.id)}
        />
      ))}
    </aside>
  );
}
