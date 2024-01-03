import { Router } from 'express'
// Internal
import { IAuthModel, IAuthService } from './auth.interfaces'
// External
import { IUsersModel } from '../users/users.interfaces'
import { User } from '../users/users.types'

export type AuthModelCreate = (signUpData: SignUp) => Promise<Tenant>

export type AuthServiceSignUp = (signUpData: SignUp) => Promise<Tenant>
export type AuthServiceLogIn = (logInData: LogIn) => Promise<UserTokens>
export type AuthServiceRefreshTokens = (oldRefreshToken: string) => Promise<UserTokens>
export type AuthServiceGetUserTokens = (user: any) => Promise<UserTokens>

export type AuthCreateRoutes =
({
  authModel,
  usersModel
}:
{
  authModel: IAuthModel
  usersModel: IUsersModel
}) => Router

export type AuthServiceConstructor = {
  authModel: IAuthModel
  usersModel: IUsersModel
}

export type AuthControllerConstructor = {
  authService: IAuthService
}

export type LogIn = Pick<User, 'username' | 'password'>

export type SignUp = {
  tenantName: string
} & Omit<User, 'id' | 'tenantId'>

export type Tenant = {
  id?: string
  name: string
  createdAt: Date
}

export type UserTokens = {
  accessToken: string
  refreshToken: string
}
