import { mount } from './mount'
import type { WidgetConfig } from './types'

const script = document.currentScript as HTMLScriptElement | null

const config: WidgetConfig = {
  endpoint: script?.dataset.endpoint ?? 'http://localhost:3001',
  botName: script?.dataset.botName ?? 'AI Assistant',
  welcomeMessage: script?.dataset.welcome ?? 'Hi! How can I help you today?',
  accentColor: script?.dataset.accent ?? '#00d4ff',
  secondaryColor: script?.dataset.secondary ?? '#a78bfa',
}

mount(config)
