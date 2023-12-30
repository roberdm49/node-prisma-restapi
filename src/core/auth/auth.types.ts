import { Router } from 'express'
// Internal
import { IAuthModel, ILogIn, ISignUp, ITenant, IUserTokens } from './auth.interfaces'
// External
import { IUsersModel } from '../users/users.interfaces'

export type TAuthModelCreate = (signUpData: ISignUp) => Promise<ITenant>

export type TAuthServiceSignUp = (signUpData: ISignUp) => Promise<ITenant>
export type TAuthServiceLogIn = (logInData: ILogIn) => Promise<IUserTokens>
export type TAuthServiceIsRefreshTokenExpired = (refreshToken: string) => Promise<boolean>

export type TAuthCreateRoutes =
({
  authModel,
  usersModel
}:
{
  authModel: IAuthModel
  usersModel: IUsersModel
}) => Router
