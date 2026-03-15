import { useEffect, useRef } from 'react'
import type { Message } from '../types'

export function useAutoScroll(messages: Message[], isStreaming: boolean) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const sentinel = sentinelRef.current
    if (!container || !sentinel) return

    const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 80
    if (nearBottom || isStreaming) {
      sentinel.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, isStreaming])

  return { sentinelRef, containerRef }
}
