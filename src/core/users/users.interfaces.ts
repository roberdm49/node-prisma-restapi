import { RequestHandler } from 'express'
import {
  UsersRepositoryCreate,
  UsersRepositoryGetOneById,
  UsersRepositoryGetOneByUsername,
  UsersRepositoryUpdate,
  UsersServiceCreate,
  UsersServiceUpdate
} from './users.types'

export interface IUsersRepository {
  create: UsersRepositoryCreate
  update: UsersRepositoryUpdate
  getOneByUsername: UsersRepositoryGetOneByUsername
  getOneById: UsersRepositoryGetOneById
}

export interface IUsersService {
  create: UsersServiceCreate
  update: UsersServiceUpdate
}

export interface IUsersController {
  create: RequestHandler
  update: RequestHandler
}
