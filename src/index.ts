import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'
import { GlobalEnv } from '@/utils/constants'
import { configureRoutes } from '@/config/routes'
import { errorHandlerMiddleware } from './middlewares/errorHandling'
import { routeNotFoundMiddleware } from './middlewares/routeNotFound'

dotenv.config()

const app = express()
const port = !isNaN(GlobalEnv.APP_PORT)
  ? GlobalEnv.APP_PORT
  : 3000

app.use(morgan('dev'))
app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded
app.use(cookieParser())

app.use(configureRoutes())

app.use(errorHandlerMiddleware)
app.use(routeNotFoundMiddleware)

app.listen(port, () => {
  // TODO: restrict this message only for dev environment
  console.log(`✅ App listening on ${chalk.cyan.bold(`http://localhost:${port}`)}`)
})
