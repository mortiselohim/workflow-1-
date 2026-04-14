import Anthropic from '@anthropic-ai/sdk';
import { addDiary, addMemory, AgentId, AGENTS, makeAgentCtx } from '../db/db.js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export type StreamHandlers = {
  onToken: (token: string) => void;
};

export async function runAgentStream(agentId: AgentId, task: string, handlers: StreamHandlers): Promise<string> {
  const agent = AGENTS.find((a) => a.id === agentId);
  if (!agent) throw new Error(`Unknown agent: ${agentId}`);

  const context = makeAgentCtx(agentId);
  const system = `${agent.systemPrompt}\n${context}`;

  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 800,
    system,
    messages: [{ role: 'user', content: task }]
  });

  let full = '';
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      full += event.delta.text;
      handlers.onToken(event.delta.text);
    }
  }

  const summary = full.replace(/\s+/g, ' ').slice(0, 220);
  addDiary(agentId, summary);
  addMemory(agentId, task.slice(0, 80), summary);

  return full;
}
