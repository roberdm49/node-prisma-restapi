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
      const dailySales = await this.dailySaleService.getAll()
      return response.status(HttpStatus.OK).json(dailySales)
    } catch (error) {
      next(error)
    }
  }
}
