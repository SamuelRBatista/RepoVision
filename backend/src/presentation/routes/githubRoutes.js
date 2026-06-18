import express from 'express'
import GithubController from '../controllers/GithubController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/search', authMiddleware, (req, res) => GithubController.search(req, res))

export default router
