import { RequestHandler } from 'express'
import { IPurchaseController, IPurchaseService } from './purchase.interfaces'
import { HttpStatus } from '@/enums/httpStatus'

export default class PurchaseController implements IPurchaseController {
  private readonly purchaseService: IPurchaseService

  constructor ({ purchaseService }: { purchaseService: IPurchaseService }) {
    this.purchaseService = purchaseService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const purchases = await this.purchaseService.getAll()
      return response.status(HttpStatus.OK).json(purchases)
    } catch (error) {
      next()
    }
  }
}
