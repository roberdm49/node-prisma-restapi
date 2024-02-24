import { Router } from 'express'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { IProductService } from '../products/products.interfaces'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'
import { ICurrencyService } from '../currency/currency.interfaces'
import { Product } from '../products/products.types'

export type PurchaseModelGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseModelCreate = (dailySaleId: string, purchasedItems: PurchasedItemEntry[]) => Promise<number>

export type PurchaseServiceGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseServiceCreate = (tenantId: string, dailySaleId: string, purchasedItems: Product[]) => Promise<number>

export type PurchaseCreateRoutes =
  ({ purchaseModel, productService, dailySaleService, currencyService }:
  { purchaseModel: IPurchaseModel, productService: IProductService, dailySaleService: IDailySaleService, currencyService: ICurrencyService })
  => Router

export type PurchaseServiceConstructor = {
  purchaseModel: IPurchaseModel
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
  unitPrice: number
  purchaseId: string
  productHistoryId: string
  dailyExchangeRateId: string
}

export type PurchasedItemEntry = Omit<PurchasedItem, 'id' | 'purchaseId'>
