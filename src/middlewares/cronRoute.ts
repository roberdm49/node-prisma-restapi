import { RequestHandler } from 'express'
import chalk from 'chalk'
import { GlobalEnv } from '@/utils/constants'
import { HttpStatus } from '@/enums/httpStatus'

// TODO: for non-dev environments, create IP whitelist and validate it
export const cronRouteMiddleware: RequestHandler = (request, response, next) => {
  console.log(chalk.whiteBright.bold.underline('Executing cron route middleware'))

  const cronSecret = request.headers.authorization

  if (!cronSecret || cronSecret !== `Bearer ${GlobalEnv.CRON_SECRET}`) {
    return response.status(HttpStatus.Forbidden).json({ message: 'Acceso no autorizado.' })
  }

  next()
}
