import { Router } from 'express'
import { IUser, IUsersModel } from './users.interfaces'

export type TUsersModelCreate = (userData: IUser) => Promise<IUser>
export type TUsersModelUpdate = (userData: IUser) => Promise<IUser>

export type TUsersServiceCreate = (userData: IUser) => Promise<IUser>
export type TUsersServiceUpdate = (userData: IUser) => Promise<IUser>

export type TUsersCreateRoutes = ({ usersModel }: { usersModel: IUsersModel }) => Router
