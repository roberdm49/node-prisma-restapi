import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { IAuthModel, IAuthService, IAuthServiceConstructor } from './auth.interfaces'
import { TAuthServiceLogIn, TAuthServiceSignUp } from './auth.types'
import { IUsersModel } from '../users/users.interfaces'

export default class AuthService implements IAuthService {
  private readonly authModel: IAuthModel
  private readonly usersModel: IUsersModel

  constructor ({ authModel, usersModel }: IAuthServiceConstructor) {
    this.authModel = authModel
    this.usersModel = usersModel
  }

  signUp: TAuthServiceSignUp = async (signUpData) => {
    const rounds = 10
    const hashedPassword = await bcrypt.hash(signUpData.password, rounds)

    const tenant = await this.authModel.create({
      ...signUpData,
      password: hashedPassword
    })

    return tenant
  }

  logIn: TAuthServiceLogIn = async (loginData) => {
    const wrongCredentialsError = new Error('Wrong credentials')

    const foundUser = await this.usersModel.getOneByUsername(loginData.username)
    if (foundUser === null) throw wrongCredentialsError

    const validPassword: boolean = await bcrypt.compare(loginData.password, foundUser.password)
    if (!validPassword) throw wrongCredentialsError

    const userForToken = {
      id: foundUser.id,
      username: foundUser.username
    }

    const accessToken = jwt.sign(userForToken, String(process.env.JWT_SECRET), { expiresIn: '30m' })
    // const refreshToken = jwt.sign(userForToken, String(process.env.JWT_SECRET), { expiresIn: '2h' })

    return {
      accessToken
    }
  }
}
