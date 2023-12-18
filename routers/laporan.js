import express from 'express'
import {get, post, del} from '../controllers/laporan.js'

const router = express.Router()

router.get('/', get)
router.post('/', post)
router.delete('/:id', del)

export default router