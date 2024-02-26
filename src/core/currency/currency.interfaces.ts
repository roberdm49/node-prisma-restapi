import { RequestHandler } from 'express'
import {
  CurrencyRepositoryCreateNewCurrencyHistories,
  CurrencyRepositoryGetAll,
  CurrencyRepositoryGetManyByIsoCodes,
  CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
  CurrencyServiceGetManyByIsoCodes,
  CurrencyServiceUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export interface ICurrencyRepository {
  getAll: CurrencyRepositoryGetAll
  getManyByIsoCodes: CurrencyRepositoryGetManyByIsoCodes
  createNewCurrencyHistories: CurrencyRepositoryCreateNewCurrencyHistories
  updateCurrencyWithLatestExchangeRates: CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates
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
