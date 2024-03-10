import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { GlobalEnv } from '@/utils/constants'
import { JwtExpireTime } from '@/enums/expireTime'
import { ErrorClientMessages } from '@/enums/errors'
import { RefreshTokenError, WrongCredentialsError } from '@/errors'
import { AccessTokenPayload } from '@/types/access-token'
import { IAuthRepository, IAuthService } from './auth.interfaces'
import { IUsersRepository } from '../users/users.interfaces'
import { AuthServiceConstructor, AuthServiceGetUserTokens, AuthServiceLogIn, AuthServiceRefreshTokens, AuthServiceSignUp } from './auth.types'

export default class AuthService implements IAuthService {
  private readonly authRepository: IAuthRepository
  private readonly usersRepository: IUsersRepository

  constructor ({ authRepository, usersRepository }: AuthServiceConstructor) {
    this.authRepository = authRepository
    this.usersRepository = usersRepository
  }

  signUp: AuthServiceSignUp = async (signUpData) => {
    const hashedPassword = await bcrypt.hash(signUpData.password, GlobalEnv.HASH_ROUNDS)

    const tenant = await this.authRepository.create({
      ...signUpData,
      password: hashedPassword
    })

    return tenant
  }

  logIn: AuthServiceLogIn = async (logInData) => {
    const foundUser = await this.usersRepository.getOneByUsername(logInData.username)
    if (!foundUser) throw new WrongCredentialsError(ErrorClientMessages.WrongCredentials)

    const validPassword: boolean = await bcrypt.compare(logInData.password, foundUser.password)
    if (!validPassword) throw new WrongCredentialsError(ErrorClientMessages.WrongCredentials)

    const tokens = await this.getUserTokens(foundUser)

    return tokens
  }

  getRefreshTokens: AuthServiceRefreshTokens = async (oldRefreshToken) => {
    if (!oldRefreshToken) {
      throw new RefreshTokenError('Falta el refresh token')
    }

    const decodedToken = jwt.verify(oldRefreshToken, GlobalEnv.REFRESH_TOKEN_SECRET)
    const userId = (decodedToken as AccessTokenPayload).id
    const foundUser = this.usersRepository.getOneById(userId)
    const tokens = await this.getUserTokens(foundUser)

    return tokens
  }

  getUserTokens: AuthServiceGetUserTokens = async (user) => {
    const userForToken = {
      id: user.id,
      username: user.username,
      tenantId: user.tenantId
    }

    const accessToken = jwt.sign(userForToken, GlobalEnv.ACCESS_TOKEN_SECRET, { expiresIn: JwtExpireTime.AccessToken })
    const refreshToken = jwt.sign(userForToken, GlobalEnv.REFRESH_TOKEN_SECRET, { expiresIn: JwtExpireTime.RefreshToken })

    return {
      accessToken,
      refreshToken
    }
  }
}
