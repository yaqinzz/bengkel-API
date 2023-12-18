import express from 'express'
import {addBooking, booking} from '../controllers/booking.js'

const router = express.Router()

router.post('/', addBooking)
router.get('/', booking)

// router.delete('/', deletedAdmin)

export default router
