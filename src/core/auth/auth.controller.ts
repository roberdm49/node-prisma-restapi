import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IAuthController, IAuthService } from './auth.interfaces'

export default class AuthController implements IAuthController {
  private readonly authService: IAuthService

  constructor ({ authService }: { authService: IAuthService }) {
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
      const loginSuccessfully = await this.authService.logIn(request.body)
      const codeStatus = loginSuccessfully
        ? HttpStatus.OK
        : HttpStatus.BadRequest
      return response.status(codeStatus)
    } catch (error) {
      next()
    }
  }
}
