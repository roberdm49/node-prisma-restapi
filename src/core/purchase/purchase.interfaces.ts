import { RequestHandler } from 'express'
import {
  PurchaseModelCreate,
  PurchaseModelGetAll,
  PurchaseServiceCreate,
  PurchaseServiceGetAll
} from './purchase.types'

export interface IPurchaseModel {
  getAll: PurchaseModelGetAll
  create: PurchaseModelCreate
}

export interface IPurchaseService {
  getAll: PurchaseServiceGetAll
  create: PurchaseServiceCreate
}

export interface IPurchaseController {
  getAll: RequestHandler
  create: RequestHandler
}
