import { RequestHandler } from 'express'
import {
  PurchaseModelGetAll,
  PurchaseServiceGetAll
} from './purchase.types'

export interface IPurchaseModel {
  getAll: PurchaseModelGetAll
}

export interface IPurchaseService {
  getAll: PurchaseServiceGetAll
}

export interface IPurchaseController {
  getAll: RequestHandler
}
