import { RequestHandler } from 'express'
// Internal
import { AuthModelCreate, AuthServiceIsRefreshTokenExpired, AuthServiceLogIn, AuthServiceSignUp } from './auth.types'

export interface IAuthModel {
  create: AuthModelCreate
}

export interface IAuthService {
  signUp: AuthServiceSignUp
  logIn: AuthServiceLogIn
  isRefreshTokenExpired: AuthServiceIsRefreshTokenExpired
}

export interface IAuthController {
  signUp: RequestHandler
  logIn: RequestHandler
  refreshToken: RequestHandler
}
