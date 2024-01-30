import { Router } from 'express'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'

export type PurchaseModelGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseModelCreate = (data: Purchase[]) => Promise<unknown>

export type PurchaseServiceGetAll = (tenantId: string) => Promise<Purchase[]>
export type PurchaseServiceCreate = (tenantId: string, data: Purchase[]) => Promise<unknown>

export type PurchaseCreateRoutes = ({ purchaseModel }: { purchaseModel: IPurchaseModel }) => Router

export type PurchaseServiceConstructor = {
  purchaseModel: IPurchaseModel
}

export type PurchaseControllerConstructor = {
  purchaseService: IPurchaseService
}

export type Purchase = {
  id?: string
  createdAt: Date
  dailySaleId: string
}
