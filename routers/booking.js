import express from 'express'
import {addBooking} from '../controllers/booking.js'

const router = express.Router()

router.post('/', addBooking)
// router.delete('/', deletedAdmin)

export default router
