import Anthropic from '@anthropic-ai/sdk'
import type { Response } from 'express'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const systemPrompt = process.env.SYSTEM_PROMPT ?? 'You are a helpful AI assistant. Be concise and friendly.'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function streamResponse(messages: ChatMessage[], res: Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  const stream = await client.messages.stream({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    system: systemPrompt,
    messages,
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      res.write(`data: ${event.delta.text}\n\n`)
    }
  }

  res.write('data: [DONE]\n\n')
  res.end()
}
