import { Router } from 'express'
import { IUsersRepository, IUsersService } from './users.interfaces'

export type UsersRepositoryCreate = (userData: User) => Promise<User>
export type UsersRepositoryUpdate = (userData: User) => Promise<User>
export type UsersRepositoryGetOneByUsername = (username: string) => Promise<User | null>
export type UsersRepositoryGetOneById = (id: string) => Promise<User | null>

export type UsersServiceCreate = (userData: User) => Promise<User>
export type UsersServiceUpdate = (userData: User) => Promise<User>

export type UsersCreateRoutes = ({ usersRepository }: { usersRepository: IUsersRepository }) => Router

export type UsersServiceConstructor = {
  usersRepository: IUsersRepository
}

export type UsersControllerConstructor = {
  usersService: IUsersService
}

export type User = {
  id?: string
  username: string
  firstname: string
  lastname: string
  password: string
  tenantId: string
}
