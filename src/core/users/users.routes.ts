import express from 'express'
import UsersService from './users.service'
import UsersController from './users.controller'
import { TUsersCreateRoutes } from './users.types'

export const createUsersRoutes: TUsersCreateRoutes = ({ usersModel }) => {
  const router = express.Router()
  const usersService = new UsersService({ usersModel })
  const usersController = new UsersController({ usersService })

  router.post('/user', usersController.create)

  return router
}
