import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import { GlobalEnv } from '@/utils/constants'
import { CookieNames } from '@/enums/cookies'

export const protectedRouteMiddleware: RequestHandler = (request, response, next) => {
  console.log(chalk.cyan.bold.underline('Executing protected route middleware'))
  const accessToken: string = request.cookies[CookieNames.AccessToken]
  const accessTokenExists = Boolean(accessToken)
  if (!accessTokenExists) {
    // verify this error handler
    return next(new Error('JWT is missing'))
  }

  const decoded = jwt.verify(accessToken, GlobalEnv.ACCESS_TOKEN_SECRET)
  request.user = decoded

  next()
}
