import express from 'express'
import {addPickup} from '../controllers/pickup.js'

const router = express.Router()

router.post('/', addPickup)
// router.delete('/', deletedAdmin)

export default router
