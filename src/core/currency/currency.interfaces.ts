import { RequestHandler } from 'express'
import {
  CurrencyModelCreateNewCurrencyHistories,
  CurrencyModelGetAll,
  CurrencyModelGetManyByIsoCodes,
  CurrencyModelUpdateCurrencyWithLatestExchangeRates,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
  CurrencyServiceGetManyByIsoCodes,
  CurrencyServiceUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export interface ICurrencyModel {
  getAll: CurrencyModelGetAll
  getManyByIsoCodes: CurrencyModelGetManyByIsoCodes
  createNewCurrencyHistories: CurrencyModelCreateNewCurrencyHistories
  updateCurrencyWithLatestExchangeRates: CurrencyModelUpdateCurrencyWithLatestExchangeRates
}

export interface ICurrencyService {
  getAll: CurrencyServiceGetAll
  getManyByIsoCodes: CurrencyServiceGetManyByIsoCodes
  createNewCurrencyHistories: CurrencyServiceCreateNewCurrencyHistories
  updateCurrencyWithLatestExchangeRates: CurrencyServiceUpdateCurrencyWithLatestExchangeRates
}

export interface ICurrencyController {
  getAll: RequestHandler
  createNewCurrencyHistoriesAndUpdateCurrenciesTarget: RequestHandler
}
