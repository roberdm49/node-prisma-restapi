import { RequestHandler } from 'express'
import {
  TPurchaseModelGetAll,
  TPurchaseServiceGetAll
} from './purchase.types'

export interface IPurchaseModel {
  getAll: TPurchaseModelGetAll
}

export interface IPurchaseService {
  getAll: TPurchaseServiceGetAll
}

export interface IPurchaseServiceConstructor {
  purchaseModel: IPurchaseModel
}

export interface IPurchaseController {
  getAll: RequestHandler
}

export interface IPurchaseControllerConstructor {
  purchaseService: IPurchaseService
}

export interface IPurchase {
  id?: string
  createdAt: Date
  dailySaleId: string
}
