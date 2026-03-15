import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { chatRouter } from './routes/chat.js'

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) ?? '*'

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())
app.use('/chat', chatRouter)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on('SIGTERM', () => process.exit(0))
