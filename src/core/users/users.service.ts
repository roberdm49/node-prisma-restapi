import bcrypt from 'bcrypt'
import { IUsersModel, IUsersService } from './users.interfaces'
import { UsersServiceConstructor, UsersServiceCreate, UsersServiceUpdate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersModel: IUsersModel

  constructor ({ usersModel }: UsersServiceConstructor) {
    this.usersModel = usersModel
  }

  create: UsersServiceCreate = async (userData) => {
    const rounds = 10
    const hashedPassword = await bcrypt.hash(userData.password, rounds)
    return await this.usersModel.create({
      ...userData,
      password: hashedPassword
    })
  }

  update: UsersServiceUpdate = async (userData) => {
    return await this.usersModel.update(userData)
  }
}
