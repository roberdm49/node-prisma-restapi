import { hashPassword } from '@/utils/hash'
import { validateUser } from '@/utils/validateUser'
import { IAuthModel, IAuthService } from './auth.interfaces'
import { TAuthServiceLogIn, TAuthServiceSignUp } from './auth.types'

export default class AuthService implements IAuthService {
  private readonly authModel: IAuthModel

  constructor ({ authModel }: { authModel: IAuthModel }) {
    this.authModel = authModel
  }

  signUp: TAuthServiceSignUp = async (tenantAndUser) => {
    const hashedPassword = hashPassword(tenantAndUser.password)

    const tenant = await this.authModel.create({
      ...tenantAndUser,
      password: hashedPassword
    })

    return tenant
  }

  logIn: TAuthServiceLogIn = async (loginData) => {
    const loginSuccessfully = validateUser(loginData)
    return loginSuccessfully
  }
}
