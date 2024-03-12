import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IUsersController, IUsersService } from './users.interfaces'
import { User, UsersControllerConstructor } from './users.types'
import { createSchema } from './users.zod-schema'

export default class UsersController implements IUsersController {
  private readonly usersService: IUsersService

  constructor ({ usersService }: UsersControllerConstructor) {
    this.usersService = usersService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const entry = createSchema.parse(request.body)
      const userData: User = { ...entry, tenantId }
      const user = await this.usersService.create(userData)
      return response.status(HttpStatus.Created).json(user)
    } catch (error) {
      next(error)
    }
  }
}
