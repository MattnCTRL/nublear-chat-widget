import { useState, useCallback } from 'react'
import type { Message, WidgetConfig } from '../types'

export function useChat(config: WidgetConfig) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: config.welcomeMessage,
      createdAt: new Date(),
    },
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      createdAt: new Date(),
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      createdAt: new Date(),
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setIsStreaming(true)
    setError(null)

    try {
      const history = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch(`${config.endpoint}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          if (data === '[ERROR]') throw new Error('Stream error')

          setMessages(prev => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last.role === 'assistant') {
              updated[updated.length - 1] = { ...last, content: last.content + data }
            }
            return updated
          })
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last.role === 'assistant' && last.content === '') {
          updated[updated.length - 1] = { ...last, content: 'Sorry, something went wrong. Please try again.' }
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming, config.endpoint])

  return { messages, isStreaming, error, sendMessage }
}
