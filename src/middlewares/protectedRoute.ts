import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
import { GlobalEnv } from '@/utils/constants'
import { CookieNames } from '@/enums/cookies'
import { UnauthorizedError } from '@/errors'
import { AccessTokenPayload } from '@/types/access-token'

export const protectedRouteMiddleware: RequestHandler = (request, response, next) => {
  console.log(chalk.cyan.bold.underline('Executing protected route middleware'))

  const accessToken: string = request.cookies[CookieNames.AccessToken]
  console.log(request)
  console.log('################################################')
  console.log(request.cookies)
  console.log('################################################')
  const accessTokenExists = Boolean(accessToken)
  console.log('################################################')
  console.log(accessTokenExists)
  if (!accessTokenExists) {
    return next(new UnauthorizedError('Access token inválido'))
  }

  const decoded = jwt.verify(accessToken, GlobalEnv.ACCESS_TOKEN_SECRET) as AccessTokenPayload

  request.user = decoded

  next()
}
