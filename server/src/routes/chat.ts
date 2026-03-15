import { Router, Request, Response } from 'express'
import { streamResponse } from '../lib/anthropic.js'

export const chatRouter = Router()

chatRouter.post('/', async (req: Request, res: Response) => {
  const { messages } = req.body

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages array required' })
    return
  }

  const valid = messages.every(
    (m: unknown) =>
      typeof m === 'object' &&
      m !== null &&
      'role' in m &&
      'content' in m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string'
  )

  if (!valid) {
    res.status(400).json({ error: 'invalid message format' })
    return
  }

  try {
    await streamResponse(messages, res)
  } catch (err) {
    console.error(err)
    res.write('data: [ERROR]\n\n')
    res.end()
  }
})
