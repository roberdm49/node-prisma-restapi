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
      const { tenantId } = request.user
      const purchases = await this.purchaseService.getAll(tenantId)
      return response.status(HttpStatus.OK).json(purchases)
    } catch (error) {
      next(error)
    }
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const { dailySaleId, purchases } = request.body
      const newPurchases = await this.purchaseService.create(tenantId, dailySaleId, purchases)
      return response.status(HttpStatus.Created).json(newPurchases)
    } catch (error) {
      next(error)
    }
  }
}
