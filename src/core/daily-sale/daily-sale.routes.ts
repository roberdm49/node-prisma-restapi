import express, { Router } from 'express'
import DailySaleService from './daily-sale.service'
import DailySaleController from './daily-sale.controller'
import { IDailySaleModel } from './daily-sale.interfaces'

export const createDailySaleRoutes = ({ dailySaleModel }: { dailySaleModel: IDailySaleModel }): Router => {
  const router = express.Router()
  const dailySaleService = new DailySaleService({ dailySaleModel })
  const dailySaleController = new DailySaleController({ dailySaleService })

  router.get('/get', dailySaleController.getAll)

  return router
}
