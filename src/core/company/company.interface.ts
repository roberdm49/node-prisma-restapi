import { RequestHandler } from 'express'
import { CompanyRepositoryCreate, CompanyRepositoryGetAll, CompanyServiceCreate, CompanyServiceGetAll } from './company.types'

export interface ICompanyRepository {
  getAll: CompanyRepositoryGetAll
  create: CompanyRepositoryCreate
}

export interface ICompanyService {
  getAll: CompanyServiceGetAll
  create: CompanyServiceCreate
}

export interface ICompanyController {
  getAll: RequestHandler
  create: RequestHandler
}
