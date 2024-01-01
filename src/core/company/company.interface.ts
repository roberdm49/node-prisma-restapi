import { RequestHandler } from 'express'
import { CompanyModelGetAll, CompanyServiceGetAll } from './company.types'

export interface ICompanyModel {
  getAll: CompanyModelGetAll
}

export interface ICompanyService {
  getAll: CompanyServiceGetAll
}

export interface ICompanyController {
  getAll: RequestHandler
}
