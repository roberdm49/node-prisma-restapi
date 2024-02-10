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
      const { dailySaleId, purchasedItems } = request.body
      const newPurchase = await this.purchaseService.create(tenantId, dailySaleId, purchasedItems)
      return response.status(HttpStatus.Created).json(newPurchase)
    } catch (error) {
      next(error)
    }
  }
}
