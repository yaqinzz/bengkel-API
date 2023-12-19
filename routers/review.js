import express from 'express'
import {get} from '../controllers/review.js'

const router = express.Router()

router.get('/', get)

export default router
