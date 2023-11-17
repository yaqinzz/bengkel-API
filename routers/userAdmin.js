import express from 'express'
import {getUserAdmin, getUserAllAdmin} from '../controllers/userAdmin.js'
const router = express.Router()

router.get('/find/:adminId', getUserAdmin)
router.get('/allAdmin', getUserAllAdmin)

export default router
