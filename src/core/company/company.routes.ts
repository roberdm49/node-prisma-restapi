import express from 'express'
import CompanyService from './company.service'
import CompanyController from './company.controller'
import { TCompanyCreateRoutes } from './company.types'

export const createCompanyRoutes: TCompanyCreateRoutes = ({ companyModel }) => {
  const router = express.Router()
  const companyService = new CompanyService({ companyModel })
  const companyController = new CompanyController({ companyService })

  router.get('/get', companyController.getAll)

  return router
}
