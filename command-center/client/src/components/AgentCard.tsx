import { Agent } from '../store/agentStore';

const statusColor: Record<string, string> = {
  idle: 'bg-zinc-500',
  thinking: 'bg-amber-400 animate-pulse',
  responding: 'bg-emerald-400 animate-pulse',
  error: 'bg-red-500'
};

export default function AgentCard({
  agent,
  selected,
  onClick
}: {
  agent: Agent;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded border px-3 py-2 text-left transition ${
        selected ? 'border-emerald-400 bg-zinc-800/80' : 'border-zinc-700 bg-zinc-900'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">{agent.name}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${statusColor[agent.status]}`} />
      </div>
      <div className="mt-1 text-xs text-zinc-400">{agent.role}</div>
      <div className="text-[10px] text-zinc-500">{agent.lastActive ? `Last active: ${new Date(agent.lastActive).toLocaleTimeString()}` : 'No activity yet'}</div>
    </button>
  );
}
