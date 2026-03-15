import { useState, useRef, useCallback } from 'react'
import styles from '../styles/widget.module.css'

interface Props {
  isStreaming: boolean
  onSend: (text: string) => void
  accentColor: string
  secondaryColor: string
}

export default function InputBar({ isStreaming, onSend, accentColor, secondaryColor }: Props) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const submit = useCallback(() => {
    if (!value.trim() || isStreaming) return
    onSend(value)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [value, isStreaming, onSend])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`
  }

  return (
    <div className={styles.inputBar}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        rows={1}
        disabled={isStreaming}
      />
      <button
        className={styles.sendBtn}
        onClick={submit}
        disabled={!value.trim() || isStreaming}
        aria-label="Send"
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})` }}
      >
        {isStreaming ? (
          <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        )}
      </button>
    </div>
  )
}
