import express, { Router } from 'express'
import { ICompanyModel } from './company.interface'
import CompanyService from './company.service'
import CompanyController from './company.controller'

export const createCompanyRoutes = ({ companyModel }: { companyModel: ICompanyModel }): Router => {
  const router = express.Router()
  const companyService = new CompanyService({ companyModel })
  const companyController = new CompanyController({ companyService })

  router.get('/get', companyController.getAll)

  return router
}
