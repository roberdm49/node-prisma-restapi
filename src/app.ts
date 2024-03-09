import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import { configureRoutes } from '@/config/routes'
import { errorHandlerMiddleware } from '@/middlewares/errorHandling'
import { routeNotFoundMiddleware } from '@/middlewares/routeNotFound'

export const createApp = (): express.Application => {
  const app = express()

  app.use(morgan('dev'))
  app.use(express.json()) // http://expressjs.com/en/api.html#express.json
  app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded
  app.use(cookieParser())

  app.use(configureRoutes())

  app.use(errorHandlerMiddleware)
  app.use(routeNotFoundMiddleware)

  return app
}
