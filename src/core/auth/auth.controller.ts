import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { createSecureCookie } from '@/utils/createSecureCookie'
import { CookieExpireTime } from '@/enums/expireTime'
import { CookieNames } from '@/enums/cookies'
import { IAuthController, IAuthControllerConstructor, IAuthService } from './auth.interfaces'

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
      next()
    }
  }

  logIn: RequestHandler = async (request, response, next) => {
    try {
      const { accessToken, refreshToken } = await this.authService.logIn(request.body)
      response.setHeader('Set-Cookie', [
        createSecureCookie(CookieNames.AccessToken, accessToken, CookieExpireTime.AccessToken),
        createSecureCookie(CookieNames.RefreshToken, refreshToken, CookieExpireTime.RefreshToken)
      ])
      return response.status(HttpStatus.OK)
    } catch (error) {
      next()
    }
  }
}
