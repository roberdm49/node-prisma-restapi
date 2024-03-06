import { RequestHandler } from 'express'
import {
  CurrencyRepositoryCreateNewCurrencyHistories,
  CurrencyRepositoryGetAll,
  CurrencyRepositoryGetManyByIsoCodes,
  CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
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
  createNewCurrencyHistories: CurrencyServiceCreateNewCurrencyHistories
  updateCurrencyWithLatestExchangeRates: CurrencyServiceUpdateCurrencyWithLatestExchangeRates
}

export interface ICurrencyController {
  getAll: RequestHandler
  createNewCurrencyHistoriesAndUpdateCurrenciesTarget: RequestHandler
}
