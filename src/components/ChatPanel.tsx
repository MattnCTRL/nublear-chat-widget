import MessageList from './MessageList'
import InputBar from './InputBar'
import type { Message, WidgetConfig } from '../types'
import styles from '../styles/widget.module.css'

interface Props {
  config: WidgetConfig
  messages: Message[]
  isStreaming: boolean
  onSend: (text: string) => void
  onClose: () => void
}

export default function ChatPanel({ config, messages, isStreaming, onSend, onClose }: Props) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.botAvatar} style={{ background: `linear-gradient(135deg, ${config.accentColor}, ${config.secondaryColor})` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div className={styles.botInfo}>
          <span className={styles.botName}>{config.botName}</span>
          <span className={styles.botStatus}>
            <span className={styles.statusDot} />
            {isStreaming ? 'Typing…' : 'Online'}
          </span>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <MessageList
        messages={messages}
        isStreaming={isStreaming}
        accentColor={config.accentColor}
        secondaryColor={config.secondaryColor}
      />

      <InputBar isStreaming={isStreaming} onSend={onSend} accentColor={config.accentColor} secondaryColor={config.secondaryColor} />
    </div>
  )
}
