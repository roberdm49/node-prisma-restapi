import { BadRequestError } from '@/errors'
import { IProductService } from '../products/products.interfaces'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll, PurchasedItemEntry } from './purchase.types'
import { ErrorClientMessages } from '@/enums/errors'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyService } from '../currency/currency.interfaces'
import { Product } from '../products/products.types'
import { Currency } from '../currency/currency.types'

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

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, products) => {
    // TODO: we receive the products from the client, but we should use
    // the data stored in our db, since we need data which is not provided by
    // the client (i.e: latestProductHistoryId).
    // So before to call this function we need to get the products from the db
    // (in order to obtain their ids)
    const [foundDailySale, currencies] = await Promise.all([
      this.dailySaleService.getOneById(dailySaleId),
      this.currencyService.getAll()
    ])

    if (!foundDailySale) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    if (!(await this.dailySaleService.dailySaleBelongToTenant(tenantId, foundDailySale))) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const productIds = products.map(product => product.id)

    if (!(await this.productService.everyProductBelongToSameTenant(tenantId, productIds))) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const purchasedItemsEntry = await this.createPurchasedItemsArrayFromProductsArray(products, currencies)

    return await this.purchaseModel.create(dailySaleId, purchasedItemsEntry)
  }

  createPurchasedItemsArrayFromProductsArray = async (products: Product[], currencies: Currency[]): Promise<PurchasedItemEntry[]> => {
    const purchasedItemsMap: Map<string, PurchasedItemEntry> = new Map()

    for (const product of products) {
      const key = product.name
      const existingPurchasedItem = purchasedItemsMap.get(key)

      if (existingPurchasedItem) {
        existingPurchasedItem.quantity += 1
      }

      if (!existingPurchasedItem) {
        const foundCurrency = currencies.find(currency => currency.id === product.currencyId)

        if (!foundCurrency?.recentExchangeRateId) {
          throw new Error('Internal server error - system under corrections')
        }

        const purchasedItem: PurchasedItemEntry = {
          quantity: 1,
          unitPrice: product.price,
          dailyExchangeRateId: foundCurrency.recentExchangeRateId,
          productHistoryId: product.latestProductHistoryId
        }

        purchasedItemsMap.set(key, purchasedItem)
      }
    }

    const purchasedItemsEntries: PurchasedItemEntry[] = Array.from(purchasedItemsMap.values())

    return purchasedItemsEntries
  }
}
