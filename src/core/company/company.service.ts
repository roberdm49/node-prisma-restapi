import { ICompanyModel, ICompanyService } from './company.interface'
import { CompanyServiceConstructor, CompanyModelGetAll } from './company.types'

export default class CompanyService implements ICompanyService {
  private readonly companyModel: ICompanyModel

  constructor ({ companyModel }: CompanyServiceConstructor) {
    this.companyModel = companyModel
  }

  getAll: CompanyModelGetAll = async () => {
    return await this.companyModel.getAll()
  }
}
