import { RequestHandler } from 'express'
// Internal
import { AuthRepositoryCreate, AuthServiceLogIn, AuthServiceRefreshTokens, AuthServiceSignUp } from './auth.types'

export interface IAuthRepository {
  create: AuthRepositoryCreate
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
