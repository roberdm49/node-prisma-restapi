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

export interface IPurchaseController {
  getAll: RequestHandler
}

export interface IPurchase {
  id?: string
  createdAt: Date
  dailySaleId: string
}
