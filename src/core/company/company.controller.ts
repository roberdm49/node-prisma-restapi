import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { ICompanyController, ICompanyService } from './company.interface'

export default class CompanyController implements ICompanyController {
  private readonly companyService: ICompanyService

  constructor ({ companyService }: { companyService: ICompanyService }) {
    this.companyService = companyService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const companies = await this.companyService.getAll()
      return response.status(HttpStatus.OK).json(companies)
    } catch (error) {
      next()
    }
  }
}
