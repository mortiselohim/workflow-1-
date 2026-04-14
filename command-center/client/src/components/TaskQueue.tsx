import { useTaskQueue } from '../hooks/useTaskQueue';

export default function TaskQueue() {
  const { pending, active, done } = useTaskQueue();
  return (
    <section className="grid grid-cols-3 gap-2 rounded border border-zinc-700 bg-zinc-900 p-3 text-xs">
      <div>
        <h3 className="mb-2 font-bold text-zinc-300">Pending ({pending.length})</h3>
        <div className="space-y-1 text-zinc-400">{pending.slice(0, 4).map((t) => <div key={t.id}>#{t.id} {t.agent_id}</div>)}</div>
      </div>
      <div>
        <h3 className="mb-2 font-bold text-amber-300">Active ({active.length})</h3>
        <div className="space-y-1">{active.slice(0, 4).map((t) => <div key={t.id} className="text-amber-200">⏳ #{t.id} {t.agent_id}</div>)}</div>
      </div>
      <div>
        <h3 className="mb-2 font-bold text-emerald-300">Completed ({done.length})</h3>
        <div className="space-y-1 text-zinc-400">{done.slice(0, 4).map((t) => <div key={t.id}>#{t.id} {t.agent_id}</div>)}</div>
      </div>
    </section>
  );
}
