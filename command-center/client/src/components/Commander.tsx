/**
 * Demo walkthrough routing logic:
 * 1) In Commander mode, task text is sent to the backend router.
 * 2) The backend commander uses keyword heuristics to pick Researcher/Coder/Analyst/Critic.
 * 3) If Coder is selected, the result is automatically chained to Critic for QA.
 * 4) Socket.io streams token events and status updates live to the UI.
 */
export default function CommanderBanner({ online }: { online: number }) {
  return (
    <header className="mb-3 flex items-center justify-between rounded border border-zinc-700 bg-zinc-900 p-3">
      <h1 className="text-lg font-bold tracking-widest text-emerald-300">COMMAND CENTER</h1>
      <div className="text-xs text-zinc-300">status bar: {online} agents online</div>
    </header>
  );
}
