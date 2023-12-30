import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { createSecureCookie } from '@/utils/createSecureCookie'
import { CookieExpireTime } from '@/enums/expireTime'
import { CookieNames } from '@/enums/cookies'
import { IAuthController, IAuthControllerConstructor, IAuthService, ILogIn } from './auth.interfaces'
import { UnauthorizedError } from '@/errors/Unauthorized'
import { ErrorMessages } from '@/enums/errors'

export default class AuthController implements IAuthController {
  private readonly authService: IAuthService

  constructor ({ authService }: IAuthControllerConstructor) {
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
      const loginData: ILogIn = request.body
      const { accessToken, refreshToken } = await this.authService.logIn(loginData)
      response.setHeader('Set-Cookie', [
        createSecureCookie(CookieNames.AccessToken, accessToken, CookieExpireTime.AccessToken),
        createSecureCookie(CookieNames.RefreshToken, refreshToken, CookieExpireTime.RefreshToken)
      ])
      return response.status(HttpStatus.OK)
    } catch (error) {
      next(error)
    }
  }

  refreshToken: RequestHandler = async (request, response, next) => {
    try {
      const refreshToken: string = request.cookies[CookieNames.RefreshToken]

      if (!refreshToken) {
        throw new UnauthorizedError(ErrorMessages.RefreshTokenNotProvided)
      }

      const isTokenExpired = await this.authService.isRefreshTokenExpired(refreshToken)

      if (isTokenExpired) {
        throw new UnauthorizedError(ErrorMessages.RefreshTokenNotProvided)
      }
    } catch (error) {
      next(error)
    }
  }
}
