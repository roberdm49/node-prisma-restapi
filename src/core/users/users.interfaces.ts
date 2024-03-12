import { RequestHandler } from 'express'
import {
  UsersRepositoryCreate,
  UsersRepositoryGetOneById,
  UsersRepositoryGetOneByUsername,
  UsersServiceCreate
} from './users.types'

export interface IUsersRepository {
  create: UsersRepositoryCreate
  getOneByUsername: UsersRepositoryGetOneByUsername
  getOneById: UsersRepositoryGetOneById
}

export interface IUsersService {
  create: UsersServiceCreate
}

export interface IUsersController {
  create: RequestHandler
}
