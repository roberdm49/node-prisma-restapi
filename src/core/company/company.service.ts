import { ICompanyModel, ICompanyService } from './company.interface'
import { CompanyServiceConstructor, CompanyModelGetAll, CompanyModelCreate } from './company.types'

export default class CompanyService implements ICompanyService {
  private readonly companyModel: ICompanyModel

  constructor ({ companyModel }: CompanyServiceConstructor) {
    this.companyModel = companyModel
  }

  getAll: CompanyModelGetAll = async (tenantId) => {
    return await this.companyModel.getAll(tenantId)
  }

  create: CompanyModelCreate = async (tenantId, company, products) => {
    return await this.companyModel.create(tenantId, company, products)
  }
}
