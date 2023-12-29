import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { GlobalEnv } from '@/constants'
import { CookieNames } from '@/enums/cookies'

export const protectedRoute: RequestHandler = (request, response, next) => {
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
