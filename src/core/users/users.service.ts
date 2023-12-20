import { hashPassword } from '@/utils/hash'
import { IUsersModel, IUsersService } from './users.interfaces'
import { TUsersServiceCreate, TUsersServiceUpdate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersModel: IUsersModel

  constructor ({ usersModel }: { usersModel: IUsersModel }) {
    this.usersModel = usersModel
  }

  create: TUsersServiceCreate = async (userData) => {
    const hashedPassword = hashPassword(userData.password)
    return await this.usersModel.create({
      ...userData,
      password: hashedPassword
    })
  }

  update: TUsersServiceUpdate = async (userData) => {
    return await this.usersModel.update(userData)
  }
}
