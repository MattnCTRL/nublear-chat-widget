import type { Message } from '../types'
import styles from '../styles/widget.module.css'

interface Props {
  message: Message
  isLastMessage: boolean
  isStreaming: boolean
  accentColor: string
  secondaryColor: string
}

export default function MessageBubble({ message, isLastMessage, isStreaming, accentColor, secondaryColor }: Props) {
  const isUser = message.role === 'user'
  const showCursor = !isUser && isLastMessage && isStreaming

  return (
    <div className={`${styles.bubbleRow} ${isUser ? styles.bubbleRowUser : ''}`}>
      <div
        className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAssistant}`}
        style={isUser ? { background: `linear-gradient(135deg, ${accentColor}cc, ${secondaryColor}cc)` } : undefined}
      >
        {message.content}
        {showCursor && <span className={styles.cursor} />}
      </div>
    </div>
  )
}
