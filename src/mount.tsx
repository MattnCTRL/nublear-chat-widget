import { createRoot } from 'react-dom/client'
import App from './components/App'
import type { WidgetConfig } from './types'

export function mount(config: WidgetConfig) {
  const container = document.createElement('div')
  container.id = 'nbw-root'
  document.body.appendChild(container)
  const root = createRoot(container)
  root.render(<App config={config} />)

  return () => {
    root.unmount()
    container.remove()
  }
}
