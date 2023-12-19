import { IUsersModel, IUsersService } from './users.interfaces'
import { TUsersServiceCreate } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersModel: IUsersModel

  constructor ({ usersModel }: { usersModel: IUsersModel }) {
    this.usersModel = usersModel
  }

  create: TUsersServiceCreate = async (userData) => {
    return await this.usersModel.create(userData)
  }
}
