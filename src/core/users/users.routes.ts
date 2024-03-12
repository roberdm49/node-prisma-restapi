import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import UsersService from './users.service'
import UsersController from './users.controller'
import { UsersCreateRoutes } from './users.types'

export const createUsersRoutes: UsersCreateRoutes = ({ usersRepository }) => {
  const router = express.Router()
  const usersService = new UsersService({ usersRepository })
  const usersController = new UsersController({ usersService })

  router.post('/create', [protectedRouteMiddleware], usersController.create)

  return router
}
