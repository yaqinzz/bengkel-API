import express from 'express'
import authRouters from './auth.js'
import adminRouters from './userAdmin.js'
import customerRoters from './userCustomer.js'
import booking from './booking.js'
import pickup from './pickup.js'

const app = express()

app.use('/', authRouters)
app.use('/api/auth', authRouters)
app.use('/api/admin', adminRouters)
app.use('/api/customer', customerRoters)
app.use('/api/booking', booking)
app.use('/api/pickup', pickup)

export default app
