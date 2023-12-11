import express from 'express'

const router = express.Router()

import {deletedCustomer, getUserAllCustomer} from '../controllers/userCustomer.js'

// router.get('/find/:customerId', getUserCustomer)
router.get('/allCustomer', getUserAllCustomer)
// router.patch('/:customerId', updateCustomer)
router.delete('/:customerId', deletedCustomer)

export default router
