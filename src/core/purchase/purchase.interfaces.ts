import { RequestHandler } from 'express'
import {
  PurchaseRepositoryCreate,
  PurchaseRepositoryGetAll,
  PurchaseServiceCreate,
  PurchaseServiceGetAll
} from './purchase.types'

export interface IPurchaseRepository {
  getAll: PurchaseRepositoryGetAll
  create: PurchaseRepositoryCreate
}

export interface IPurchaseService {
  getAll: PurchaseServiceGetAll
  create: PurchaseServiceCreate
}

export interface IPurchaseController {
  getAll: RequestHandler
  create: RequestHandler
}
