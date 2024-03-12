import { RequestHandler } from 'express'
import {
  UsersRepositoryGetOneById,
  UsersRepositoryGetOneByUsername
} from './users.types'

export interface IUsersRepository {
  getOneByUsername: UsersRepositoryGetOneByUsername
  getOneById: UsersRepositoryGetOneById
}

// eslint-disable-next-line
export interface IUsersService {}

export interface IUsersController {
  create: RequestHandler
}
