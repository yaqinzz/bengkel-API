import express from 'express'
import {getUserAllCustomer, getUserCustomer} from '../controllers/userCustomer.js'
const router = express.Router()

router.get('/find/:customerId', getUserCustomer)
router.get('/allCustomer', getUserAllCustomer)

export default router
