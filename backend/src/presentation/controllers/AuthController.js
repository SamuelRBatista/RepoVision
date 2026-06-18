import AuthService from '../../application/services/AuthService.js'

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body
      const user = await AuthService.register({ name, email, password })
      return res.status(201).json({ id: user.id, name: user.name, email: user.email })
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await AuthService.login({ email, password })
      return res.json(result)
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message })
    }
  }
}

export default new AuthController()
