import { Router } from 'express'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'

export type PurchaseModelGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseModelCreate = (tenantId: string, dailySaleId: string, purchasedItems: PurchasedItem[]) => Promise<unknown>

export type PurchaseServiceGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseServiceCreate = (tenantId: string, dailySaleId: string, purchasedItems: PurchasedItem[]) => Promise<unknown>

export type PurchaseCreateRoutes = ({ purchaseModel }: { purchaseModel: IPurchaseModel }) => Router

export type PurchaseServiceConstructor = {
  purchaseModel: IPurchaseModel
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
