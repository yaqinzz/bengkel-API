import express from 'express'
import {addPickup, detail, pickup} from '../controllers/pickup.js'

const router = express.Router()

router.post('/', addPickup)
router.get('/', pickup)
router.get('/:detailId', detail)

// router.delete('/', deletedAdmin)

export default router
