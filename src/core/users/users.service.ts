import bcrypt from 'bcrypt'
import { IUsersModel, IUsersService, IUsersServiceConstructor } from './users.interfaces'
import { TUsersServiceCreate, TUsersServiceUpdate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersModel: IUsersModel

  constructor ({ usersModel }: IUsersServiceConstructor) {
    this.usersModel = usersModel
  }

  create: TUsersServiceCreate = async (userData) => {
    const rounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, rounds)
    return await this.usersModel.create({
      ...userData,
      password: hashedPassword
    })
  }

  update: TUsersServiceUpdate = async (userData) => {
    return await this.usersModel.update(userData)
  }
}
