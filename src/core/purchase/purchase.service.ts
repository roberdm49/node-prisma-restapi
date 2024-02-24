import { BadRequestError } from '@/errors'
import { IProductService } from '../products/products.interfaces'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll } from './purchase.types'
import { ErrorClientMessages } from '@/enums/errors'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyService } from '../currency/currency.interfaces'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel

  private readonly dailySaleService: IDailySaleService
  private readonly productService: IProductService
  private readonly currencyService: ICurrencyService

  constructor ({ purchaseModel, productService, dailySaleService, currencyService }: PurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
    this.productService = productService
    this.dailySaleService = dailySaleService
    this.currencyService = currencyService
  }

  getAll: PurchaseServiceGetAll = async (tenantId) => {
    return await this.purchaseModel.getAll(tenantId)
  }

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, purchasedItems) => {
    //TODO: change purchasedItems type for "productEntry" and work on it
    const [foundDailySale, currencyValues] = await Promise.all([
      this.dailySaleService.getOneById(dailySaleId),
      this.currencyService.getMapMostRecentCurrencyValues()
    ])

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

    const purchasedItemsWithExchangeRate = purchasedItems.map(purchasedItem => {
      const dailyExchangeRate = currencyValues[purchasedItem.currencyId]
      return {
        ...purchasedItem,
        dailyExchangeRate:
      }
    })

    return await this.purchaseModel.create(dailySaleId, purchasedItems)
  }
}
