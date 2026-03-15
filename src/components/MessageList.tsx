import MessageBubble from './MessageBubble'
import { useAutoScroll } from '../hooks/useAutoScroll'
import type { Message } from '../types'
import styles from '../styles/widget.module.css'

interface Props {
  messages: Message[]
  isStreaming: boolean
  accentColor: string
  secondaryColor: string
}

export default function MessageList({ messages, isStreaming, accentColor, secondaryColor }: Props) {
  const { containerRef, sentinelRef } = useAutoScroll(messages, isStreaming)

  return (
    <div className={styles.messageList} ref={containerRef}>
      {messages.map((msg, i) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isLastMessage={i === messages.length - 1}
          isStreaming={isStreaming}
          accentColor={accentColor}
          secondaryColor={secondaryColor}
        />
      ))}
      <div ref={sentinelRef} />
    </div>
  )
}
