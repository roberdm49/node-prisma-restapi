import { Router } from 'express'
import { ICompanyRepository, ICompanyService } from './company.interface'

export type CompanyRepositoryGetAll = (tenantId: string) => Promise<Company[]>
export type CompanyRepositoryCreate = (tenantId: string, company: Company) => Promise<Company>

export type CompanyServiceGetAll = (tenantId: string) => Promise<Company[]>
export type CompanyServiceCreate = (tenantId: string, company: Company) => Promise<Company>

export type CompanyCreateRoutes = ({ companyRepository }: { companyRepository: ICompanyRepository }) => Router

export type CompanyServiceConstructor = {
  companyRepository: ICompanyRepository
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
