import { TRequestHandler } from '@/types/TRequestHandler'
import {
  TUsersModelCreate,
  TUsersModelUpdate,
  TUsersServiceCreate,
  TUsersServiceUpdate
} from './users.types'

export interface IUsersModel {
  create: TUsersModelCreate
  update: TUsersModelUpdate
}

export interface IUsersService {
  create: TUsersServiceCreate
  update: TUsersServiceUpdate
}

export interface IUsersController {
  create: TRequestHandler
  update: TRequestHandler
}

export interface IUser {
  id?: string
  username: string
  firstname: string
  lastname: string
  password: string
  tenantId: string
}
