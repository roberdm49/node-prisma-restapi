import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import DailySaleService from './daily-sale.service'
import DailySaleController from './daily-sale.controller'
import { DailySaleCreateRoutes } from './daily-sale.types'

export const createDailySaleRoutes: DailySaleCreateRoutes = ({ dailySaleRepository }) => {
  const router = express.Router()
  const dailySaleService = new DailySaleService({ dailySaleRepository })
  const dailySaleController = new DailySaleController({ dailySaleService })

  router.get('/get', [protectedRouteMiddleware], dailySaleController.getAll)

  return router
}
