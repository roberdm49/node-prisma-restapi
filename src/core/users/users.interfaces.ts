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

// eslint-disable-next-line
export interface IUsersController {}
