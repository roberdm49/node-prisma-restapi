import { BadRequestError } from '@/errors'
import { IProductService } from '../products/products.interfaces'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll } from './purchase.types'
import { ErrorClientMessages } from '@/enums/errors'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyModel } from '../currency/currency.interfaces'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel
  private readonly currencyModel: ICurrencyModel

  private readonly dailySaleService: IDailySaleService
  private readonly productService: IProductService

  constructor ({ purchaseModel, productService, dailySaleService, currencyModel }: PurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
    this.productService = productService
    this.dailySaleService = dailySaleService
    this.currencyModel = currencyModel
  }

  getAll: PurchaseServiceGetAll = async (tenantId) => {
    return await this.purchaseModel.getAll(tenantId)
  }

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, purchasedItems) => {
    const foundDailySale = await this.dailySaleService.getOneById(dailySaleId)

    if (!foundDailySale) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    if (!this.dailySaleService.dailySaleBelongToTenant(tenantId, foundDailySale)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const productIds = purchasedItems.map(purchasedItem => purchasedItem.productId)

    if (!this.productService.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.purchaseModel.create(dailySaleId, purchasedItems)
  }
}
