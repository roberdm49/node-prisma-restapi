import { BadRequestError } from '@/errors'
import { ErrorClientMessages } from '@/enums/errors'
import { createPurchasedItemsArrayFromProductsArray, getMergedProductsAndQuantity } from '@/utils/transformationsProductPurchase'
import { IPurchaseRepository, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll } from './purchase.types'
import { IProductService } from '../products/products.interfaces'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyService } from '../currency/currency.interfaces'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseRepository: IPurchaseRepository

  private readonly dailySaleService: IDailySaleService
  private readonly productService: IProductService
  private readonly currencyService: ICurrencyService

  constructor ({ purchaseRepository, productService, dailySaleService, currencyService }: PurchaseServiceConstructor) {
    this.purchaseRepository = purchaseRepository
    this.productService = productService
    this.dailySaleService = dailySaleService
    this.currencyService = currencyService
  }

  getAll: PurchaseServiceGetAll = async (tenantId) => {
    return await this.purchaseRepository.getAll(tenantId)
  }

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, products) => {
    /*
      fullproducts = getmanybyids(purchasedItems.map(purchasedItem => purchasedItem.id))

      validdailysale = check if is a valid daily sale
      validproducts = check if products ids are valid

      productswithquantity = merge fullproducts with purchasedItems(they have the quantity)

    */
    const productIds = products.map(product => product.id)

    const [foundDailySale, currencies, productsWithFullData] = await Promise.all([
      this.dailySaleService.getOneById(dailySaleId),
      this.currencyService.getAll(),
      this.productService.getManyById(productIds)
    ])

    if (!foundDailySale) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const [dailySaleBelongToTenant, everyProductBelongToSameTenant] = await Promise.all([
      this.dailySaleService.dailySaleBelongToTenant(tenantId, foundDailySale),
      this.productService.everyProductBelongToSameTenant(tenantId, productIds)
    ])

    if (!dailySaleBelongToTenant || !everyProductBelongToSameTenant) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const productsWithFullDataAndQuantity = getMergedProductsAndQuantity(productsWithFullData, products)
    const purchasedItemsEntry = createPurchasedItemsArrayFromProductsArray(productsWithFullDataAndQuantity, currencies)

    return await this.purchaseRepository.create(dailySaleId, purchasedItemsEntry)
  }
}
