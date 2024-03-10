import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { createSecureCookie } from '@/utils/createSecureCookie'
import { CookieExpireTime } from '@/enums/expireTime'
import { CookieNames } from '@/enums/cookies'
import { IAuthController, IAuthService } from './auth.interfaces'
import { AuthControllerConstructor, LogIn, SignUp } from './auth.types'
import { logInSchema, signUpSchema } from './auth.zod-schema'

export default class AuthController implements IAuthController {
  private readonly authService: IAuthService

  constructor ({ authService }: AuthControllerConstructor) {
    this.authService = authService
  }

  signUp: RequestHandler = async (request, response, next) => {
    try {
      const tenantData: SignUp = signUpSchema.parse(request.body)
      const tenant = await this.authService.signUp(tenantData)
      return response.status(HttpStatus.Created).json(tenant)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  logIn: RequestHandler = async (request, response, next) => {
    try {
      const loginData: LogIn = logInSchema.parse(request.body)
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
      const oldRefreshToken: string = request.cookies[CookieNames.RefreshToken]
      const { accessToken, refreshToken } = await this.authService.getRefreshTokens(oldRefreshToken)
      response.setHeader('Set-Cookie', [
        createSecureCookie(CookieNames.AccessToken, accessToken, CookieExpireTime.AccessToken),
        createSecureCookie(CookieNames.RefreshToken, refreshToken, CookieExpireTime.RefreshToken)
      ])
      return response.sendStatus(HttpStatus.OK)
    } catch (error) {
      next(error)
    }
  }
}
