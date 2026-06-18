import express from 'express'
import cors from 'cors'
import authRoutes from './presentation/routes/authRoutes.js'
import githubRoutes from './presentation/routes/githubRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/github', githubRoutes)

app.get('/', (req, res) => res.json({ ok: true }))

export default app
