import GithubService from '../../application/services/GithubService.js'

class GithubController {
  async search(req, res) {
    try {
      const q = req.query.q || 'react'
      const data = await GithubService.searchRepositories(q)
      return res.json(data)
    } catch (err) {
      return res.status(500).json({ error: 'Error fetching from GitHub', details: err.message })
    }
  }
}

export default new GithubController()
