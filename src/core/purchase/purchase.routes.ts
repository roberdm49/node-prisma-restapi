import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import PurchaseService from './purchase.service'
import PurchaseController from './purchase.controller'
import { PurchaseCreateRoutes } from './purchase.types'

export const createPurchaseRoutes: PurchaseCreateRoutes = ({ purchaseModel }) => {
  const router = express.Router()

  const purchaseService = new PurchaseService({ purchaseModel })
  const purchaseController = new PurchaseController({ purchaseService })

  router.get('/get', [protectedRouteMiddleware], purchaseController.getAll)

  return router
}
