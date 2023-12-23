import { RequestHandler } from 'express'
import { TCurrencyModelGetAll, TCurrencyServiceGetAll } from './currency.types'

export interface ICurrencyModel {
  getAll: TCurrencyModelGetAll
}

export interface ICurrencyService {
  getAll: TCurrencyServiceGetAll
}

export interface ICurrencyServiceConstructor {
  currencyModel: ICurrencyModel
}

export interface ICurrencyController {
  getAll: RequestHandler
}

export interface ICurrencyControllerConstructor {
  currencyService: ICurrencyService
}

export interface ICurrency {
  id: string
  name: string
  isoCode?: string | null
  isoNum?: string | null
}
