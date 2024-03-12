import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import PurchaseService from './purchase.service'
import PurchaseController from './purchase.controller'
import { PurchaseCreateRoutes } from './purchase.types'

export const createPurchaseRoutes: PurchaseCreateRoutes = ({ purchaseRepository, productService, dailySaleService, currencyService }) => {
  const router = express.Router()

  const purchaseService = new PurchaseService({ purchaseRepository, productService, dailySaleService, currencyService })
  const purchaseController = new PurchaseController({ purchaseService })

  router.get('/get', [protectedRouteMiddleware], purchaseController.getAll)
  router.post('/create', [protectedRouteMiddleware], purchaseController.create)

  return router
}
