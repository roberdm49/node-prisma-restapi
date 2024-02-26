import { Router } from 'express'
// Internal
import { IAuthRepository, IAuthService } from './auth.interfaces'
// External
import { IUsersRepository } from '../users/users.interfaces'
import { User } from '../users/users.types'

export type AuthRepositoryCreate = (signUpData: SignUp) => Promise<Tenant>

export type AuthServiceSignUp = (signUpData: SignUp) => Promise<Tenant>
export type AuthServiceLogIn = (logInData: LogIn) => Promise<UserTokens>
export type AuthServiceRefreshTokens = (oldRefreshToken: string) => Promise<UserTokens>
export type AuthServiceGetUserTokens = (user: any) => Promise<UserTokens>

export type AuthCreateRoutes =
({
  authRepository,
  usersRepository
}:
{
  authRepository: IAuthRepository
  usersRepository: IUsersRepository
}) => Router

export type AuthServiceConstructor = {
  authRepository: IAuthRepository
  usersRepository: IUsersRepository
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
