import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import cors from 'cors'
import routes from './routers/index.js'

const app = express()
const port = 5000

//middlewares
app.use(express.json())
app.use((req, res, next) => {
  app.use(express.json())
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}
app.use(cors(corsConfig))
app.options('', cors(corsConfig))

app.use(cookieParser())
app.use(bodyParser.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} `)
})
