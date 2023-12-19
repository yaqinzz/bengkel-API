import express from 'express'
import {addPickup, detail, pickup, patch} from '../controllers/pickup.js'

const router = express.Router()

router.post('/', addPickup)
router.get('/', pickup)
router.get('/:detailId', detail)

// UPDATE STATUS
router.patch('/:id', patch)

// router.delete('/', deletedAdmin)

export default router
