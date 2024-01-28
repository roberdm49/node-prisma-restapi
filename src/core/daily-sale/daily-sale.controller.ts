import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IDailySaleController, IDailySaleService } from './daily-sale.interfaces'
import { DailySaleControllerConstructor } from './daily-sale.types'

export default class DailySaleController implements IDailySaleController {
  private readonly dailySaleService: IDailySaleService

  constructor ({ dailySaleService }: DailySaleControllerConstructor) {
    this.dailySaleService = dailySaleService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const dailySales = await this.dailySaleService.getAll(tenantId)
      return response.status(HttpStatus.OK).json(dailySales)
    } catch (error) {
      next(error)
    }
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const newDailySale = await this.dailySaleService.create(tenantId)
      return response.status(HttpStatus.Created).json(newDailySale)
    } catch (error) {
      next(error)
    }
  }
}
