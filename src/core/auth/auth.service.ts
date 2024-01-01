import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { GlobalEnv } from '@/constants'
import { JwtExpireTime } from '@/enums/expireTime'
import { ErrorMessages } from '@/enums/errors'
import { WrongCredentialsError } from '@/errors/WrongCredentials'
import { IAuthModel, IAuthService } from './auth.interfaces'
import { AuthServiceConstructor, AuthServiceIsRefreshTokenExpired, AuthServiceLogIn, AuthServiceSignUp } from './auth.types'
import { IUsersModel } from '../users/users.interfaces'

export default class AuthService implements IAuthService {
  private readonly authModel: IAuthModel
  private readonly usersModel: IUsersModel

  constructor ({ authModel, usersModel }: AuthServiceConstructor) {
    this.authModel = authModel
    this.usersModel = usersModel
  }

  signUp: AuthServiceSignUp = async (signUpData) => {
    const rounds = 10
    const hashedPassword = await bcrypt.hash(signUpData.password, rounds)

    const tenant = await this.authModel.create({
      ...signUpData,
      password: hashedPassword
    })

    return tenant
  }

  logIn: AuthServiceLogIn = async (loginData) => {
    const foundUser = await this.usersModel.getOneByUsername(loginData.username)
    if (foundUser === null) throw new WrongCredentialsError(ErrorMessages.WrongCredentials)

    const validPassword: boolean = await bcrypt.compare(loginData.password, foundUser.password)
    if (!validPassword) throw new WrongCredentialsError(ErrorMessages.WrongCredentials)

    const userForToken = {
      id: foundUser.id,
      username: foundUser.username
    }

    const accessToken = jwt.sign(userForToken, GlobalEnv.ACCESS_TOKEN_SECRET, { expiresIn: JwtExpireTime.AccessToken })
    const refreshToken = jwt.sign(userForToken, GlobalEnv.REFRESH_TOKEN_SECRET, { expiresIn: JwtExpireTime.RefreshToken })

    return {
      accessToken,
      refreshToken
    }
  }

  isRefreshTokenExpired: AuthServiceIsRefreshTokenExpired = async (refreshToken) => {
    const decodedToken = jwt.verify(refreshToken, GlobalEnv.REFRESH_TOKEN_SECRET)
    return Boolean(decodedToken)
  }
}
