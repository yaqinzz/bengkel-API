import express from 'express'
import authRouters from './routers/auth.js'
import adminRouters from './routers/userAdmin.js'
import customerRoters from './routers/userCustomer.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {response} from './response.js'

const app = express()
const port = 5000

//middlewares
app.use(express.json())
app.use((req, res, next) => {
  app.use(express.json())
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
// app.use(
//   cors({
//     origin: '*',
//   })
// )

const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
app.use(cors(corsConfig))
app.options('', cors(corsConfig))

app.use(cookieParser())
app.use('/', authRouters)

app.use('/api/auth', authRouters)
app.use('/api/admin', adminRouters)
app.use('/api/customer', customerRoters)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
})

export default app
