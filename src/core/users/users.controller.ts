import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IUsersController, IUsersService } from './users.interfaces'
import { User, UsersControllerConstructor } from './users.types'

export default class UsersController implements IUsersController {
  private readonly usersService: IUsersService

  constructor ({ usersService }: UsersControllerConstructor) {
    this.usersService = usersService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const userData: User = request.body
      const user = await this.usersService.create(userData)
      return response.status(HttpStatus.Created).json(user)
    } catch (error) {
      next(error)
    }
  }

  update: RequestHandler = async (request, response, next) => {
    try {
      const newUserData: User = request.body
      const user = await this.usersService.update(newUserData)
      return response.status(HttpStatus.OK).json(user)
    } catch (error) {
      next(error)
    }
  }
}
