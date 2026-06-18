import AuthService from '../../application/services/AuthService.js'
import UserRepository from '../../infrastructure/repositories/UserRepository.js'

export default async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })

  const token = auth.split(' ')[1]
  const payload = AuthService.verifyToken(token)
  if (!payload) return res.status(401).json({ error: 'Invalid token' })

  const user = await UserRepository.findById(payload.sub)
  if (!user) return res.status(401).json({ error: 'User not found' })

  req.user = user
  next()
}