import { Router } from 'express'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { IProductService } from '../products/products.interfaces'
import { IDailySaleService } from '../daily-sale/daily-sale.interfaces'

export type PurchaseModelGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseModelCreate = (dailySaleId: string, purchasedItems: PurchasedItem[]) => Promise<number>

export type PurchaseServiceGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseServiceCreate = (tenantId: string, dailySaleId: string, purchasedItems: PurchasedItem[]) => Promise<number>

export type PurchaseCreateRoutes =
  ({ purchaseModel, productService }:
  { purchaseModel: IPurchaseModel, productService: IProductService })
  => Router

export type PurchaseServiceConstructor = {
  purchaseModel: IPurchaseModel
  productService: IProductService
  dailySaleService: IDailySaleService
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
  productId: string
  currencySnapshotId: string
}

export type PurchasedItemEntry = Omit<PurchasedItem, 'id' | 'currencySnapshotId'>
