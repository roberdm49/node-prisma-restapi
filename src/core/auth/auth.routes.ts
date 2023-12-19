import express, { Router } from 'express'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { IAuthModel } from './auth.interfaces'

export const createAuthRoutes = ({ authModel }: { authModel: IAuthModel }): Router => {
  const router = express.Router()
  const authService = new AuthService({ authModel })
  const authController = new AuthController({ authService })

  router.post('/sign-up', authController.signUp)

  return router
}
