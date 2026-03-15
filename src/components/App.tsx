import { useState } from 'react'
import FloatingButton from './FloatingButton'
import ChatPanel from './ChatPanel'
import { useChat } from '../hooks/useChat'
import type { WidgetConfig } from '../types'
import styles from '../styles/widget.module.css'

interface Props {
  config: WidgetConfig
}

export default function App({ config }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, isStreaming, sendMessage } = useChat(config)

  return (
    <div className={styles.root}>
      {isOpen && (
        <ChatPanel
          config={config}
          messages={messages}
          isStreaming={isStreaming}
          onSend={sendMessage}
          onClose={() => setIsOpen(false)}
        />
      )}
      <FloatingButton
        isOpen={isOpen}
        isStreaming={isStreaming}
        accentColor={config.accentColor}
        secondaryColor={config.secondaryColor}
        onClick={() => setIsOpen(o => !o)}
      />
    </div>
  )
}
