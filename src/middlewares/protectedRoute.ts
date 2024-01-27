import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import { GlobalEnv } from '@/utils/constants'
import { CookieNames } from '@/enums/cookies'
import { UnauthorizedError } from '@/errors'

// TODO: modify express.d.ts to make it work correctly
export const protectedRouteMiddleware: RequestHandler = (request: any, response, next) => {
  console.log(chalk.cyan.bold.underline('Executing protected route middleware'))

  const accessToken: string = request.cookies[CookieNames.AccessToken]
  const accessTokenExists = Boolean(accessToken)
  if (!accessTokenExists) {
    return next(new UnauthorizedError('Access token inválido'))
  }

  const decoded = jwt.verify(accessToken, GlobalEnv.ACCESS_TOKEN_SECRET)
  request.user = decoded

  next()
}
