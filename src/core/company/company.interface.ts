import { RequestHandler } from 'express'
import { TCompanyModelGetAll, TCompanyServiceGetAll } from './company.types'

export interface ICompanyModel {
  getAll: TCompanyModelGetAll
}

export interface ICompanyService {
  getAll: TCompanyServiceGetAll
}

export interface ICompanyController {
  getAll: RequestHandler
}

export interface ICompany {
  id?: string
  name: string
  createdAt: Date
  tenantId: string
}
