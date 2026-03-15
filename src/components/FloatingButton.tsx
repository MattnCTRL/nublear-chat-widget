import styles from '../styles/widget.module.css'

interface Props {
  isOpen: boolean
  isStreaming: boolean
  accentColor: string
  secondaryColor: string
  onClick: () => void
}

export default function FloatingButton({ isOpen, isStreaming, accentColor, secondaryColor, onClick }: Props) {
  return (
    <button
      className={`${styles.fab} ${isStreaming ? styles.fabPulsing : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      style={{ background: `linear-gradient(135deg, ${accentColor}, ${secondaryColor})` }}
    >
      {isOpen ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </button>
  )
}
