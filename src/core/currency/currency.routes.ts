import express from 'express'
import CurrencyService from './currency.service'
import CurrencyController from './currency.controller'
import { TCurrencyCreateRoutes } from './currency.types'

export const createCurrencyRoutes: TCurrencyCreateRoutes = ({ currencyModel }) => {
  const router = express.Router()
  const currencyService = new CurrencyService({ currencyModel })
  const currencyController = new CurrencyController({ currencyService })

  router.get('/get', currencyController.getAll)

  return router
}
