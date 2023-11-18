import express from 'express'
import authRouters from './routers/auth.js'
import adminRouters from './routers/userAdmin.js'
import customerRoters from './routers/userCustomer.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3000

//middlewares
app.use(express.json())
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(cookieParser())

app.use('/api/auth', authRouters)
app.use('/api/admin', adminRouters)
app.use('/api/customer', customerRoters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
})
