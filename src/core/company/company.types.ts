import { Router } from 'express'
import { ICompanyModel, ICompanyService } from './company.interface'

export type CompanyModelGetAll = (tenantId: string) => Promise<Company[]>
export type CompanyModelCreate = (tenantId: string, company: Company) => Promise<Company>

export type CompanyServiceGetAll = (tenantId: string) => Promise<Company[]>
export type CompanyServiceCreate = (tenantId: string, company: Company) => Promise<Company>

export type CompanyCreateRoutes = ({ companyModel }: { companyModel: ICompanyModel }) => Router

export type CompanyServiceConstructor = {
  companyModel: ICompanyModel
}

export type CompanyControllerConstructor = {
  companyService: ICompanyService
}

export type Company = {
  id?: string
  name: string
  createdAt?: Date
  tenantId: string
}
