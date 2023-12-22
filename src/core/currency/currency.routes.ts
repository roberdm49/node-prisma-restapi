import express, { Router } from 'express'
import CurrencyService from './currency.service'
import CurrencyController from './currency.controller'
import { ICurrencyModel } from './currency.interfaces'

export const createCurrencyRoutes = ({ currencyModel }: { currencyModel: ICurrencyModel }): Router => {
  const router = express.Router()
  const currencyService = new CurrencyService({ currencyModel })
  const currencyController = new CurrencyController({ currencyService })

  router.get('/get', currencyController.getAll)

  return router
}
