import { ICompany } from './company.interface'

export type TCompanyModelGetAll = () => Promise<ICompany[]>

export type TCompanyServiceGetAll = () => Promise<ICompany[]>
