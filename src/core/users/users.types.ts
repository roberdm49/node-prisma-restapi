import { IUser } from './users.interfaces'

export type TUsersModelCreate = (userData: IUser) => Promise<IUser>

export type TUsersServiceCreate = (userData: IUser) => Promise<IUser>
