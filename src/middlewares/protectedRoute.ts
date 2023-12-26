import { CookieNames } from '@/enums/cookies'
import { RequestHandler } from 'express'

export const protectedRoute: RequestHandler = (request, response, next) => {
  const accessToken = request.cookies[CookieNames.AccessToken]

  if (!accessToken) {
    // verify this error handler
    return next(new Error())
  }

  next()
}
