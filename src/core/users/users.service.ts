import { IUsersRepository, IUsersService } from './users.interfaces'
import { UsersServiceConstructor } from './users.types'

export default class UsersService implements IUsersService {
  private readonly usersRepository: IUsersRepository

  constructor ({ usersRepository }: UsersServiceConstructor) {
    this.usersRepository = usersRepository
  }
}
