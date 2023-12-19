import { RequestHandler } from '@/types/RequestHandler'
import { TUsersModelCreate, TUsersServiceCreate } from './users.types'

export interface IUsersModel {
  create: TUsersModelCreate
}

export interface IUsersService {
  create: TUsersServiceCreate
}

export interface IUsersController {
  create: RequestHandler
}

export interface IUser {
  username: string
  firstname: string
  lastname: string
  password: string
  tenantId: string
}
