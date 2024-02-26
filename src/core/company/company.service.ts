import { ICompanyRepository, ICompanyService } from './company.interface'
import { CompanyServiceConstructor, CompanyRepositoryGetAll, CompanyRepositoryCreate } from './company.types'

export default class CompanyService implements ICompanyService {
  private readonly companyRepository: ICompanyRepository

  constructor ({ companyRepository }: CompanyServiceConstructor) {
    this.companyRepository = companyRepository
  }

  getAll: CompanyRepositoryGetAll = async (tenantId) => {
    return await this.companyRepository.getAll(tenantId)
  }

  create: CompanyRepositoryCreate = async (tenantId, company) => {
    return await this.companyRepository.create(tenantId, company)
  }
}
