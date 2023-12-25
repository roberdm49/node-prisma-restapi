import { RequestHandler } from 'express'
// Internal
import { TAuthModelCreate, TAuthServiceLogIn, TAuthServiceSignUp } from './auth.types'
// External
import { IUsersModel } from '../users/users.interfaces'

export interface IAuthModel {
  create: TAuthModelCreate
}

export interface IAuthService {
  signUp: TAuthServiceSignUp
  logIn: TAuthServiceLogIn
}

export interface IAuthServiceConstructor {
  authModel: IAuthModel
  usersModel: IUsersModel
}

export interface IAuthController {
  signUp: RequestHandler
  logIn: RequestHandler
}

export interface IAuthControllerConstructor {
  authService: IAuthService
}

export interface ITenant {
  id?: string
  name: string
  createdAt: Date
}

export interface ILogIn {
  username: string
  password: string
}

export interface ISignUp {
  tenantName: string
  username: string
  firstname: string
  lastname: string
  password: string
}

export interface IUserTokens {
  accessToken: string
  refreshToken: string
}
