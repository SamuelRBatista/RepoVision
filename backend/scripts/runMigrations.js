import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
import pool from '../src/infrastructure/database/connection.js'

async function run() {
  const migrationsDir = path.resolve(process.cwd(), 'src/infrastructure/database/migrations')
  const files = await fs.readdir(migrationsDir)
  const sqlFiles = files.filter(f => f.endsWith('.sql')).sort()
  for (const file of sqlFiles) {
    const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8')
    console.log(`Applying migration: ${file}`)
    try {
      await pool.query(sql)
      console.log(`Applied: ${file}`)
    } catch (err) {
      console.error(`Failed ${file}:`, err.message)
      throw err
    }
  }
  await pool.end()
}

const __filename = fileURLToPath(import.meta.url)
if (process.argv[1] === __filename) {
  run().then(() => console.log('Migrations complete')).catch((err) => {
    console.error('Migrations failed', err)
    process.exit(1)
  })
}

export default run
