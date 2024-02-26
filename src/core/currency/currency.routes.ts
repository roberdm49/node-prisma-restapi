import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import { cronRouteMiddleware } from '@/middlewares/cronRoute'
import CurrencyService from './currency.service'
import CurrencyController from './currency.controller'
import { CurrencyCreateRoutes } from './currency.types'

export const createCurrencyRoutes: CurrencyCreateRoutes = ({ currencyRepository }) => {
  const router = express.Router()
  const currencyService = new CurrencyService({ currencyRepository })
  const currencyController = new CurrencyController({ currencyService })

  router.get('/get', [protectedRouteMiddleware], currencyController.getAll)
  router.post('/create-and-update-currencies', [cronRouteMiddleware], currencyController.createNewCurrencyHistoriesAndUpdateCurrenciesTarget)

  return router
}
