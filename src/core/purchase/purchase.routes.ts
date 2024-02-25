import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import PurchaseService from './purchase.service'
import PurchaseController from './purchase.controller'
import { PurchaseCreateRoutes } from './purchase.types'

export const createPurchaseRoutes: PurchaseCreateRoutes = ({ purchaseModel, productService, dailySaleService, currencyService }) => {
  const router = express.Router()

  const purchaseService = new PurchaseService({ purchaseModel, productService, dailySaleService, currencyService })
  const purchaseController = new PurchaseController({ purchaseService })

  router.get('/get', [protectedRouteMiddleware], purchaseController.getAll)
  router.get('/create', [protectedRouteMiddleware], purchaseController.create)

  return router
}
