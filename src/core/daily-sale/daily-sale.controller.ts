import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IDailySaleController, IDailySaleControllerConstructor, IDailySaleService } from './daily-sale.interfaces'

export default class DailySaleController implements IDailySaleController {
  private readonly dailySaleService: IDailySaleService

  constructor ({ dailySaleService }: IDailySaleControllerConstructor) {
    this.dailySaleService = dailySaleService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const dailySales = await this.dailySaleService.getAll()
      return response.status(HttpStatus.OK).json(dailySales)
    } catch (error) {
      next()
    }
  }
}
