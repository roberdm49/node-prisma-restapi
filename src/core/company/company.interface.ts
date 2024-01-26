import { RequestHandler } from 'express'
import { CompanyModelCreate, CompanyModelGetAll, CompanyServiceCreate, CompanyServiceGetAll } from './company.types'

export interface ICompanyModel {
  getAll: CompanyModelGetAll
  create: CompanyModelCreate
}

export interface ICompanyService {
  getAll: CompanyServiceGetAll
  create: CompanyServiceCreate
}

export interface ICompanyController {
  getAll: RequestHandler
  create: RequestHandler
}
