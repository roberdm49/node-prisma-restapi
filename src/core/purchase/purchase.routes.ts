import express, { Router } from 'express'
import { IPurchaseModel } from './purchase.interfaces'
import PurchaseService from './purchase.service'
import PurchaseController from './purchase.controller'

export const createPurchaseRoutes = ({ purchaseModel }: { purchaseModel: IPurchaseModel }): Router => {
  const router = express.Router()

  const purchaseService = new PurchaseService({ purchaseModel })
  const purchaseController = new PurchaseController({ purchaseService })

  router.get('/get', purchaseController.getAll)

  return router
}
