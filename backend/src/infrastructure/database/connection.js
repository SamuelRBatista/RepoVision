import { Pool } from 'pg'
import config from '../../config/index.js'

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : process.env.DB_SOCKET
    ? {
        host: process.env.DB_SOCKET,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password || undefined
      }
    : {
        host: config.db.host,
        port: config.db.port,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password || undefined
      }

const pool = new Pool(poolConfig)

console.log('Postgres connection config', {
  connectionString: process.env.DATABASE_URL ? 'DATABASE_URL' : undefined,
  host: process.env.DB_SOCKET || config.db.host,
  port: process.env.DB_SOCKET ? undefined : config.db.port,
  database: config.db.database,
  user: config.db.user,
  usingSocket: Boolean(process.env.DB_SOCKET)
})

export default pool
