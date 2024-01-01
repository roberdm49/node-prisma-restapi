import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { IPurchaseController, IPurchaseService } from './purchase.interfaces'
import { PurchaseControllerConstructor } from './purchase.types'

export default class PurchaseController implements IPurchaseController {
  private readonly purchaseService: IPurchaseService

  constructor ({ purchaseService }: PurchaseControllerConstructor) {
    this.purchaseService = purchaseService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const purchases = await this.purchaseService.getAll()
      return response.status(HttpStatus.OK).json(purchases)
    } catch (error) {
      next(error)
    }
  }
}
