import { RequestHandler } from 'express'
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

export interface IUsersServiceConstructor {
  usersModel: IUsersModel
}

export interface IUsersController {
  create: RequestHandler
  update: RequestHandler
}

export interface IUsersControllerConstructor {
  usersService: IUsersService
}

export interface IUser {
  id?: string
  username: string
  firstname: string
  lastname: string
  password: string
  tenantId: string
}
