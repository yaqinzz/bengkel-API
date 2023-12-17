import express from 'express'
import {getUserAllAdmin, deletedAdmin, updateAdmin, getUserAdmin} from '../controllers/userAdmin.js'

const router = express.Router()

router.get('/find/:adminId', getUserAdmin)
router.get('/allAdmin', getUserAllAdmin)
router.patch('/:adminId', updateAdmin)
router.delete('/:adminId', deletedAdmin)

export default router
