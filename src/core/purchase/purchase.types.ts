import { Router } from 'express'
import { IPurchaseRepository, IPurchaseService } from './purchase.interfaces'
import { IProductService } from '../products/products.interfaces'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyService } from '../currency/currency.interfaces'

export type PurchaseRepositoryGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseRepositoryCreate = (dailySaleId: string, purchasedItems: PurchasedItemEntry[]) => Promise<PurchasedItem[]>

export type PurchaseServiceGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseServiceCreate = (tenantId: string, dailySaleId: string, purchasedItems: ProductToPurchaseEntry[]) => Promise<PurchasedItem[]>

export type PurchaseCreateRoutes =
  ({ purchaseRepository, productService, dailySaleService, currencyService }:
  { purchaseRepository: IPurchaseRepository, productService: IProductService, dailySaleService: IDailySaleService, currencyService: ICurrencyService })
  => Router

export type PurchaseServiceConstructor = {
  purchaseRepository: IPurchaseRepository
  productService: IProductService
  dailySaleService: IDailySaleService
  currencyService: ICurrencyService
}

export type PurchaseControllerConstructor = {
  purchaseService: IPurchaseService
}

export type Purchase = {
  id: string
  createdAt: Date
  dailySaleId: string
}

export type PurchaseEntry = Omit<Purchase, 'id' | 'createdAt'>

export type PurchasedItem = {
  id: string
  quantity: number
  purchaseId: string
  productHistoryId: string
  dailyExchangeRateId: string
}

export type PurchasedItemEntry = Omit<PurchasedItem, 'id' | 'purchaseId'>

export type ProductToPurchaseEntry = {
  id: string
  quantity: number
}
