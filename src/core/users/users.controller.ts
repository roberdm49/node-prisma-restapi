import { HttpStatus } from '@/enums/httpStatus'
import { RequestHandler } from '@/types/RequestHandler'
import { IUser, IUsersController, IUsersService } from './users.interfaces'

export default class UsersController implements IUsersController {
  private readonly usersService: IUsersService

  constructor ({ usersService }: { usersService: IUsersService }) {
    this.usersService = usersService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const userData: IUser = request.body
      const something = await this.usersService.create(userData)
      return response.status(HttpStatus.Created).json(something)
    } catch (error) {
      next()
    }
  }
}
