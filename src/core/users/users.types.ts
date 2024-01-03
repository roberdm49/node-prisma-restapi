import { Router } from 'express'
import { IUsersModel, IUsersService } from './users.interfaces'

export type UsersModelCreate = (userData: User) => Promise<User>
export type UsersModelUpdate = (userData: User) => Promise<User>
export type UsersModelGetOneByUsername = (username: string) => Promise<User | null>
export type UsersModelGetOneById = (id: string) => Promise<User | null>

export type UsersServiceCreate = (userData: User) => Promise<User>
export type UsersServiceUpdate = (userData: User) => Promise<User>

export type UsersCreateRoutes = ({ usersModel }: { usersModel: IUsersModel }) => Router

export type UsersServiceConstructor = {
  usersModel: IUsersModel
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
