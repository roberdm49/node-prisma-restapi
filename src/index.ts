import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { configureRoutes } from './routes'

dotenv.config()

const app = express()
const port = process.env.APP_PORT ?? 3000

app.use(morgan('dev'))
app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded

app.use(configureRoutes())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
