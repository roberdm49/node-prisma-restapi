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
      const { data } = request.body
      const purchases = await this.purchaseService.create(tenantId, data)
      return response.status(HttpStatus.Created).json(purchases)
    } catch (error) {
      next(error)
    }
  }
}
