import express from 'express'
import UsersService from './users.service'
import UsersController from './users.controller'
import { UsersCreateRoutes } from './users.types'

export const createUsersRoutes: UsersCreateRoutes = ({ usersModel }) => {
  const router = express.Router()
  const usersService = new UsersService({ usersModel })
  const usersController = new UsersController({ usersService })

  router.post('/user', usersController.create)

  return router
}
