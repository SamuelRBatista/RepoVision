import UserRepository from '../../infrastructure/repositories/UserRepository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config/index.js'

class AuthService {
  async register({ name, email, password }) {
    if (!email || !password) {
      const err = new Error('Email and password are required')
      err.status = 400
      throw err
    }

    const existing = await UserRepository.findByEmail(email)
    if (existing) {
      const err = new Error('Email already in use')
      err.status = 409
      throw err
    }

    const password_hash = await bcrypt.hash(password, 10)
    const user = await UserRepository.create({ name, email, password_hash })
    return user
  }

  async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('Email and password are required')
      err.status = 400
      throw err
    }

    const user = await UserRepository.findByEmail(email)
    if (!user) {
      const err = new Error('Invalid credentials')
      err.status = 401
      throw err
    }

    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) {
      const err = new Error('Invalid credentials')
      err.status = 401
      throw err
    }

    const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, { expiresIn: '8h' })
    return { token }
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwtSecret)
    } catch (e) {
      return null
    }
  }
}

export default new AuthService()
