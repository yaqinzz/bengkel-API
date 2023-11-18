import express from 'express'
import authRouters from './routers/auth.js'
import adminRouters from './routers/userAdmin.js'
import customerRoters from './routers/userCustomer.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
const port = 3000

//middlewares
app.use(express.json())
app.use((req, res, next) => {
  app.use(express.json())
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(
  cors({
    origin: '*',
  })
)
app.use(cookieParser())

app.use('/api/auth', authRouters)
app.use('/api/admin', adminRouters)
app.use('/api/customer', customerRoters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
})
