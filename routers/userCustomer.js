import express from 'express'
import {deletedCustomer, getUserAllCustomer, getUserCustomer, updateCustomer} from '../controllers/userCustomer.js'
const router = express.Router()

router.get('/find/:customerId', getUserCustomer)
router.get('/allCustomer', getUserAllCustomer)
router.patch('/:customerId', updateCustomer)
router.delete('/:customerId', deletedCustomer)

export default router
