import express from 'express'
import {addBooking, booking, patch} from '../controllers/booking.js'

const router = express.Router()

router.post('/', addBooking)
router.get('/', booking)

// UPDATE STATUS
router.patch('/:id', patch)

// router.delete('/', deletedAdmin)

export default router
