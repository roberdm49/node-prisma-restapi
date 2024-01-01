import { Router } from 'express'
import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'

export type PurchaseModelGetAll = () => Promise<Purchase[]>

export type PurchaseServiceGetAll = () => Promise<Purchase[]>

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
