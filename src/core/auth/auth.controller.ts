import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IAuthController, IAuthControllerConstructor, IAuthService } from './auth.interfaces'
import { createSecureCookie } from '@/utils/createSecureCookie'

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
        createSecureCookie('accessToken', accessToken),
        createSecureCookie('refreshToken', refreshToken)
      ])
      return response.status(HttpStatus.OK)
    } catch (error) {
      next()
    }
  }
}
