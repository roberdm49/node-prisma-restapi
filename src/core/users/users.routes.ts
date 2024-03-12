import express from 'express'
import { UsersCreateRoutes } from './users.types'

export const createUsersRoutes: UsersCreateRoutes = ({ usersRepository }) => {
  const router = express.Router()

  return router
}
