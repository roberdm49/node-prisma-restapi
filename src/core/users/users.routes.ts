import express, { Router } from 'express'
import { IUsersModel } from './users.interfaces'
import UsersService from './users.service'
import UsersController from './users.controller'

export const createUsersRoutes = ({ usersModel }: { usersModel: IUsersModel }): Router => {
  const router = express.Router()
  const usersService = new UsersService({ usersModel })
  const usersController = new UsersController({ usersService })

  router.post('/user', usersController.create)

  return router
}
