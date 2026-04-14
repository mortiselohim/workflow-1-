import { useQuery } from '@tanstack/react-query';
import { useKnowledgeStore } from '../store/knowledgeStore';

export default function KnowledgeBase() {
  const { entries, setEntries, addEntry, query, setQuery } = useKnowledgeStore();

  useQuery({
    queryKey: ['knowledge', query],
    queryFn: async () => {
      const r = await fetch(`/api/knowledge?q=${encodeURIComponent(query)}`);
      const data = await r.json();
      setEntries(data);
      return data;
    }
  });

  async function submit(form: FormData) {
    const payload = Object.fromEntries(form.entries());
    const r = await fetch('/api/knowledge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    addEntry(await r.json());
  }

  return (
    <aside className="rounded border border-zinc-700 bg-zinc-900 p-3">
      <h2 className="text-sm font-bold text-zinc-300">Knowledge Base</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search KB" className="mt-2 w-full rounded border border-zinc-700 bg-zinc-950 p-2 text-xs" />
      <form
        className="mt-2 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit(new FormData(e.currentTarget));
          e.currentTarget.reset();
        }}
      >
        <input name="topic" placeholder="topic" className="w-full rounded border border-zinc-700 bg-zinc-950 p-2 text-xs" required />
        <textarea name="content" placeholder="fact/content" className="w-full rounded border border-zinc-700 bg-zinc-950 p-2 text-xs" required />
        <input name="tags" placeholder="tags" className="w-full rounded border border-zinc-700 bg-zinc-950 p-2 text-xs" />
        <button className="w-full rounded bg-emerald-700 py-1 text-xs">Add to KB</button>
      </form>
      <div className="mt-3 max-h-[45vh] space-y-2 overflow-auto">
        {entries.map((e) => (
          <div key={e.id} className="rounded border border-zinc-700 p-2 text-xs">
            <div className="font-bold text-emerald-300">{e.topic}</div>
            <p className="text-zinc-300">{e.content}</p>
            <p className="text-zinc-500">{e.tags}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
