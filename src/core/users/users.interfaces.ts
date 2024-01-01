import { RequestHandler } from 'express'
import {
  UsersModelCreate,
  UsersModelGetOneByUsername,
  UsersModelUpdate,
  UsersServiceCreate,
  UsersServiceUpdate
} from './users.types'

export interface IUsersModel {
  create: UsersModelCreate
  update: UsersModelUpdate
  getOneByUsername: UsersModelGetOneByUsername
}

export interface IUsersService {
  create: UsersServiceCreate
  update: UsersServiceUpdate
}

export interface IUsersController {
  create: RequestHandler
  update: RequestHandler
}
