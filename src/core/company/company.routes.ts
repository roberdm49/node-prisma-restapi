import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import CompanyService from './company.service'
import CompanyController from './company.controller'
import { CompanyCreateRoutes } from './company.types'

export const createCompanyRoutes: CompanyCreateRoutes = ({ companyModel }) => {
  const router = express.Router()
  const companyService = new CompanyService({ companyModel })
  const companyController = new CompanyController({ companyService })

  router.get('/get', [protectedRouteMiddleware], companyController.getAll)
  // router.get('/create', [protectedRouteMiddleware], companyController.create)

  return router
}
