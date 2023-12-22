import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import chalk from 'chalk'
import { configureRoutes } from './routes'

dotenv.config()

const app = express()
const port = process.env.APP_PORT ?? 3000

app.use(morgan('dev'))
app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded

app.use(configureRoutes())

app.listen(port, () => {
  // TODO: restrict this message only for dev environment
  console.log(`✅ App listening on ${chalk.cyan.bold(`http://localhost:${port}`)}`)
})
