import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { GlobalEnv } from '@/constants'
import { JwtExpireTime } from '@/enums/expireTime'
import { ErrorServerMessages } from '@/enums/errors'
import { WrongCredentialsError } from '@/errors/WrongCredentials'
import { IAuthModel, IAuthService } from './auth.interfaces'
import { AuthServiceConstructor, AuthServiceIsRefreshTokenExpired, AuthServiceLogIn, AuthServiceSignUp } from './auth.types'
import { IUsersModel } from '../users/users.interfaces'
import { MissingCredentialsError } from '@/errors/MissingCredentials'

export default class AuthService implements IAuthService {
  private readonly authModel: IAuthModel
  private readonly usersModel: IUsersModel

  constructor ({ authModel, usersModel }: AuthServiceConstructor) {
    this.authModel = authModel
    this.usersModel = usersModel
  }

  signUp: AuthServiceSignUp = async (signUpData) => {
    // throw si no estan todos los campos
    const rounds = 10
    const hashedPassword = await bcrypt.hash(signUpData.password, rounds)

    const tenant = await this.authModel.create({
      ...signUpData,
      password: hashedPassword
    })

    return tenant
  }

  logIn: AuthServiceLogIn = async (loginData) => {
    // TODO: move this array to a fn or const
    const credentials: string[] = ['username', 'password']
    const userKeysCredentials = Object.keys(loginData)
    const missingCredentials = credentials.filter(credential => !userKeysCredentials.includes(credential))

    if (missingCredentials.length > 0) {
      throw new MissingCredentialsError(ErrorServerMessages.MissingCredentials, missingCredentials)
    }

    const foundUser = await this.usersModel.getOneByUsername(loginData.username)
    if (foundUser === null) throw new WrongCredentialsError(ErrorServerMessages.WrongCredentials)

    const validPassword: boolean = await bcrypt.compare(loginData.password, foundUser.password)
    if (!validPassword) throw new WrongCredentialsError(ErrorServerMessages.WrongCredentials)

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
