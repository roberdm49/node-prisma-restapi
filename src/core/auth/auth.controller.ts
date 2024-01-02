import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { createSecureCookie } from '@/utils/createSecureCookie'
import { CookieExpireTime } from '@/enums/expireTime'
import { CookieNames } from '@/enums/cookies'
import { UnauthorizedError } from '@/errors/Unauthorized'
import { ErrorServerMessages } from '@/enums/errors'
import { IAuthController, IAuthService } from './auth.interfaces'
import { AuthControllerConstructor, LogIn } from './auth.types'

export default class AuthController implements IAuthController {
  private readonly authService: IAuthService

  constructor ({ authService }: AuthControllerConstructor) {
    this.authService = authService
  }

  signUp: RequestHandler = async (request, response, next) => {
    try {
      const tenant = await this.authService.signUp(request.body)
      return response.status(HttpStatus.Created).json(tenant)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  logIn: RequestHandler = async (request, response, next) => {
    try {
      const loginData: LogIn = request.body
      const { accessToken, refreshToken } = await this.authService.logIn(loginData)
      response.setHeader('Set-Cookie', [
        createSecureCookie(CookieNames.AccessToken, accessToken, CookieExpireTime.AccessToken),
        createSecureCookie(CookieNames.RefreshToken, refreshToken, CookieExpireTime.RefreshToken)
      ])
      return response.sendStatus(HttpStatus.Accepted)
    } catch (error) {
      next(error)
    }
  }

  refreshToken: RequestHandler = async (request, response, next) => {
    try {
      const refreshToken: string = request.cookies[CookieNames.RefreshToken]

      if (!refreshToken) {
        throw new UnauthorizedError(ErrorServerMessages.RefreshTokenNotProvided)
      }

      const isTokenExpired = await this.authService.isRefreshTokenExpired(refreshToken)

      if (isTokenExpired) {
        throw new UnauthorizedError(ErrorServerMessages.RefreshTokenNotProvided)
      }
    } catch (error) {
      next(error)
    }
  }
}
