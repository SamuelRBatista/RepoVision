import pool from '../database/connection.js'
import User from '../../domain/entities/User.js'

class UserRepository {
  async create({ name, email, password_hash }) {
    const query = `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *`
    const values = [name, email, password_hash]
    const { rows } = await pool.query(query, values)
    return new User(rows[0])
  }

  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (!rows[0]) return null
    return new User(rows[0])
  }

  async findById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    if (!rows[0]) return null
    return new User(rows[0])
  }
}

export default new UserRepository()
