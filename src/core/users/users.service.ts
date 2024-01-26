import bcrypt from 'bcrypt'
import { GlobalEnv } from '@/utils/constants'
import { IUsersModel, IUsersService } from './users.interfaces'
import { UsersServiceConstructor, UsersServiceCreate, UsersServiceUpdate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersModel: IUsersModel

  constructor ({ usersModel }: UsersServiceConstructor) {
    this.usersModel = usersModel
  }

  create: UsersServiceCreate = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, GlobalEnv.HASH_ROUNDS)
    return await this.usersModel.create({
      ...userData,
      password: hashedPassword
    })
  }

  update: UsersServiceUpdate = async (userData) => {
    return await this.usersModel.update(userData)
  }
}
