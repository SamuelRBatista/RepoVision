import runMigrations from './runMigrations.js'
import { spawn } from 'child_process'
import path from 'path'
import fs from 'fs/promises'
import axios from 'axios'

const ROOT = path.resolve(process.cwd())

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function waitForServer(url, timeout = 10000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const r = await axios.get(url)
      if (r.status < 500) return true
    } catch (e) {}
    await new Promise(res => setTimeout(res, 500))
  }
  throw new Error('Server did not start in time')
}

async function run() {
  console.log('Running migrations...')
  if (!await fileExists('.env')) {
    throw new Error('.env file missing in backend directory')
  }
  await runMigrations()

  console.log('Starting server...')
  const server = spawn('node', ['src/server.js'], { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] })
  server.stdout.on('data', (d) => process.stdout.write(`[server] ${d}`))
  server.stderr.on('data', (d) => process.stderr.write(`[server.err] ${d}`))

  try {
    await waitForServer('http://localhost:3000/')
    console.log('Server is up, testing endpoints...')

    const testEmail = `test+${Date.now()}@example.com`
    const password = '123456'

    // Register
    const reg = await axios.post('http://localhost:3000/api/auth/register', { name: 'Test User', email: testEmail, password })
    console.log('Register status:', reg.status)

    // Login
    const login = await axios.post('http://localhost:3000/api/auth/login', { email: testEmail, password })
    console.log('Login response keys:', Object.keys(login.data))
    const token = login.data.token

    // GitHub search
    const gh = await axios.get('http://localhost:3000/api/github/search', { params: { q: 'react' }, headers: { Authorization: `Bearer ${token}` } })
    console.log('GitHub search result sample:', { total: gh.data.total, top: gh.data.topByStars?.length })

    console.log('Verification succeeded')
  } catch (err) {
    console.error('Verification failed:', err.message)
  } finally {
    if (server && !server.killed) server.kill()
    process.exit(0)
  }
}

run()
