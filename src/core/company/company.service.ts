import { ICompanyModel, ICompanyService, ICompanyServiceConstructor } from './company.interface'
import { TCompanyModelGetAll } from './company.types'

export default class CompanyService implements ICompanyService {
  private readonly companyModel: ICompanyModel

  constructor ({ companyModel }: ICompanyServiceConstructor) {
    this.companyModel = companyModel
  }

  getAll: TCompanyModelGetAll = async () => {
    return await this.companyModel.getAll()
  }
}
