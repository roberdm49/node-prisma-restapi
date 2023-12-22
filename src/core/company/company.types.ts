import { Router } from 'express'
import { ICompany, ICompanyModel } from './company.interface'

export type TCompanyModelGetAll = () => Promise<ICompany[]>

export type TCompanyServiceGetAll = () => Promise<ICompany[]>

export type TCompanyCreateRoutes = ({ companyModel }: { companyModel: ICompanyModel }) => Router
