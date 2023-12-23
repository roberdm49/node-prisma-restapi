import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IUser, IUsersController, IUsersControllerConstructor, IUsersService } from './users.interfaces'

export default class UsersController implements IUsersController {
  private readonly usersService: IUsersService

  constructor ({ usersService }: IUsersControllerConstructor) {
    this.usersService = usersService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const userData: IUser = request.body
      const user = await this.usersService.create(userData)
      return response.status(HttpStatus.Created).json(user)
    } catch (error) {
      next()
    }
  }

  update: RequestHandler = async (request, response, next) => {
    try {
      const newUserData: IUser = request.body
      const user = await this.usersService.update(newUserData)
      return response.status(HttpStatus.OK).json(user)
    } catch (error) {
      next()
    }
  }
}
