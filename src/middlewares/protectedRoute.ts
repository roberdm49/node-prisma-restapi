import { CookieNames } from '@/enums/cookies'
import { RequestHandler } from 'express'

export const protectedRoute: RequestHandler = (request, response, next) => {
  const accessToken: string = request.cookies[CookieNames.AccessToken]
  const accessTokenExists = Boolean(accessToken)
  if (!accessTokenExists) {
    // verify this error handler
    return next(new Error('JWT is missing'))
  }

  // decode and check jwt using jsonwebtoken lib
  // continue with the correct flow if the jwt is a valid one

  next()
}
