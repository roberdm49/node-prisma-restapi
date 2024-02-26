import express from 'express'
import AuthController from './auth.controller'
import AuthService from './auth.service'
import { AuthCreateRoutes } from './auth.types'

export const createAuthRoutes: AuthCreateRoutes = ({ authRepository, usersRepository }) => {
  const router = express.Router()
  const authService = new AuthService({ authRepository, usersRepository })
  const authController = new AuthController({ authService })

  router.post('/sign-up', authController.signUp)
  router.post('/log-in', authController.logIn)
  router.get('/refresh-token', authController.refreshToken)

  return router
}
