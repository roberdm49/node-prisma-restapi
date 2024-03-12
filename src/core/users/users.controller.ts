import { IUsersController, IUsersService } from './users.interfaces'
import { UsersControllerConstructor } from './users.types'

export default class UsersController implements IUsersController {
  private readonly usersService: IUsersService

  constructor ({ usersService }: UsersControllerConstructor) {
    this.usersService = usersService
  }
}
