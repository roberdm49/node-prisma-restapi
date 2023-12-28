import { CookieNames } from '@/enums/cookies'
import { RequestHandler } from 'express'

export const protectedRoute: RequestHandler = (request, response, next) => {
  const accessToken: string = request.cookies[CookieNames.AccessToken]
  const accessTokenExists = Boolean(accessToken)
  if (!accessTokenExists) {
    // verify this error handler
    return next(new Error())
  }

  next()
}
