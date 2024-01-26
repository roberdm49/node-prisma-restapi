import { ICompanyModel, ICompanyService } from './company.interface'
import { CompanyServiceConstructor, CompanyModelGetAll, CompanyModelCreate } from './company.types'

export default class CompanyService implements ICompanyService {
  private readonly companyModel: ICompanyModel

  constructor ({ companyModel }: CompanyServiceConstructor) {
    this.companyModel = companyModel
  }

  getAll: CompanyModelGetAll = async () => {
    return await this.companyModel.getAll()
  }

  create: CompanyModelCreate = async (company) => {
    return await this.companyModel.create(company)
  }
}
