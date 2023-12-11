import express from 'express'
import authRouters from './auth.js'
import adminRouters from './userAdmin.js'
import customerRoters from './userCustomer.js'

const app = express()

app.use('/', authRouters)
app.use('/api/auth', authRouters)
app.use('/api/admin', adminRouters)
app.use('/api/customer', customerRoters)

export default app
