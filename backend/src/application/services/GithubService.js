import axios from 'axios'

class GithubService {
  constructor() {
    this.client = axios.create({ baseURL: 'https://api.github.com' })
  }

  async searchRepositories(q) {
    const resp = await this.client.get('/search/repositories', { params: { q } })
    const items = resp.data.items || []

    const total = resp.data.total_count || items.length
    const totalStars = items.reduce((s, r) => s + (r.stargazers_count || 0), 0)
    const totalForks = items.reduce((s, r) => s + (r.forks_count || 0), 0)

    const languages = {}
    for (const it of items) {
      const lang = it.language || 'Unknown'
      languages[lang] = (languages[lang] || 0) + 1
    }

    const topByStars = items
      .slice()
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10)

    const processed = items.map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      html_url: r.html_url,
      owner: r.owner?.login,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count
    }))

    return {
      total,
      totalStars,
      totalForks,
      languages,
      topByStars: topByStars.map((r) => ({
        id: r.id,
        name: r.name,
        owner: r.owner?.login,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        html_url: r.html_url
      })),
      items: processed
    }
  }
}

export default new GithubService()
