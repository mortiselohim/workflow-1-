import { useState } from 'react';
import { useAgentStore } from '../store/agentStore';
import { useTaskStore } from '../store/taskStore';

export default function ChatPanel() {
  const [task, setTask] = useState('');
  const { mode, setMode, pinnedAgent, setPinnedAgent, focusedAgent, agents } = useAgentStore();
  const tasks = useTaskStore((s) => s.tasks);

  const visibleTasks = focusedAgent === 'all' ? tasks : tasks.filter((t) => t.agent_id === focusedAgent);

  async function dispatch() {
    if (!task.trim()) return;
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, mode, pinnedAgent })
    });
    setTask('');
  }

  return (
    <main className="rounded border border-zinc-700 bg-zinc-900 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <button onClick={() => setMode('commander')} className={`rounded px-2 py-1 ${mode === 'commander' ? 'bg-emerald-700' : 'bg-zinc-800'}`}>Commander mode</button>
        <button onClick={() => setMode('manual')} className={`rounded px-2 py-1 ${mode === 'manual' ? 'bg-emerald-700' : 'bg-zinc-800'}`}>Manual mode</button>
        {mode === 'manual' && (
          <select value={pinnedAgent} onChange={(e) => setPinnedAgent(e.target.value as any)} className="rounded bg-zinc-800 px-2 py-1">
            {agents.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        )}
      </div>

      <div className="h-[57vh] space-y-3 overflow-auto rounded border border-zinc-800 bg-zinc-950 p-3">
        {visibleTasks.map((t) => (
          <div key={t.id} className="rounded border border-zinc-800 p-2 text-xs">
            <div className="mb-1 text-zinc-400">#{t.id} • {t.agent_id} • {t.status}</div>
            <div className="mb-1 text-zinc-200">{t.task}</div>
            <pre className="whitespace-pre-wrap text-emerald-300">{t.stream || t.result}</pre>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Dispatch a task..." className="flex-1 rounded border border-zinc-700 bg-zinc-950 p-2 text-sm" />
        <button onClick={dispatch} className="rounded bg-emerald-700 px-3">Send</button>
      </div>
    </main>
  );
}
