import { AgentId } from '../db/db.js';

export function routeTask(task: string): AgentId {
  const t = task.toLowerCase();
  if (/code|bug|typescript|python|refactor|api/.test(t)) return 'coder';
  if (/analy[sz]e|trend|dataset|metrics|forecast/.test(t)) return 'analyst';
  if (/review|critique|risk|improve|qa/.test(t)) return 'critic';
  if (/research|source|citation|compare|market/.test(t)) return 'researcher';
  return 'researcher';
}
