export interface WidgetConfig {
  endpoint: string
  botName: string
  welcomeMessage: string
  accentColor: string
  secondaryColor: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}
