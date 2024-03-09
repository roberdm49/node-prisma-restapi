import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { ICompanyController, ICompanyService } from './company.interface'
import { CompanyControllerConstructor, CompanyEntry } from './company.types'
import { companyEntrySchema } from './company.zed-schema'

export default class CompanyController implements ICompanyController {
  private readonly companyService: ICompanyService

  constructor ({ companyService }: CompanyControllerConstructor) {
    this.companyService = companyService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      console.log({ tenantId })
      const companies = await this.companyService.getAll(tenantId)
      return response.status(HttpStatus.OK).json(companies)
    } catch (error) {
      next(error)
    }
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const company: CompanyEntry = companyEntrySchema.parse(request.body)
      const newCompany = await this.companyService.create(tenantId, company)
      return response.status(HttpStatus.Created).json(newCompany)
    } catch (error) {
      next(error)
    }
  }
}
