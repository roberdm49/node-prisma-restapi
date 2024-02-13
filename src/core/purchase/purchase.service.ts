import { BadRequestError } from '@/errors'
import { IProductService } from '../products/products.interfaces'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll } from './purchase.types'
import { ErrorClientMessages } from '@/enums/errors'

export default class PurchaseService implements IPurchaseService {
  private readonly productService: IProductService
  private readonly purchaseModel: IPurchaseModel

  constructor ({ purchaseModel, productService }: PurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
    this.productService = productService
  }

  getAll: PurchaseServiceGetAll = async (tenantId) => {
    return await this.purchaseModel.getAll(tenantId)
  }

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, purchasedItems) => {
    const productIds = purchasedItems.map(purchasedItem => purchasedItem.productId)

    if (!this.productService.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.purchaseModel.create(tenantId, dailySaleId, purchasedItems)
  }
}
