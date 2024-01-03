import { RequestHandler } from 'express'
// Internal
import { AuthModelCreate, AuthServiceLogIn, AuthServiceRefreshTokens, AuthServiceSignUp } from './auth.types'

export interface IAuthModel {
  create: AuthModelCreate
}

export interface IAuthService {
  signUp: AuthServiceSignUp
  logIn: AuthServiceLogIn
  getRefreshTokens: AuthServiceRefreshTokens
}

export interface IAuthController {
  signUp: RequestHandler
  logIn: RequestHandler
  refreshToken: RequestHandler
}
