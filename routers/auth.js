import express from 'express'
import {home, loginAdmin, loginCustomer, logout, registerAdmin, registerCustomer} from '../controllers/auth.js'
const router = express.Router()

// router.get('/', home)s
router.post('/loginCustomer', loginCustomer)
router.post('/loginAdmin', loginAdmin)
router.post('/registerCustomer', registerCustomer)
router.post('/registerAdmin', registerAdmin)
router.post('/logout', logout)

export default router
