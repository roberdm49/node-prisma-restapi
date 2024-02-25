import { Router } from 'express'
import { ICurrencyModel, ICurrencyService } from './currency.interfaces'

export type CurrencyModelGetAll = () => Promise<Currency[]>
export type CurrencyModelCreateNewCurrencyHistories = (currencies: CurrencyWithValue[]) => Promise<DailyExchangeRate[]>
export type CurrencyModelGetManyByIsoCodes = (isoCodes: string[]) => Promise<Currency[]>
export type CurrencyModelUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyServiceGetAll = () => Promise<Currency[]>
export type CurrencyServiceCreateNewCurrencyHistories = (currencies: CurrencyEntry[]) => Promise<CurrencyWithValue[]>
export type CurrencyServiceGetManyByIsoCodes = (isoCodes: string[]) => Promise<Currency[]>
export type CurrencyServiceUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyCreateRoutes = ({ currencyModel }: { currencyModel: ICurrencyModel }) => Router

export type CurrencyServiceConstructor = {
  currencyModel: ICurrencyModel
}

export type CurrencyControllerConstructor = {
  currencyService: ICurrencyService
}

export type Currency = {
  id: number
  name: string
  isoCode: string
  isoNum: string
  recentExchangeRateId?: string
}

export type CurrencyEntry = Omit<Currency, 'id' | 'recentExchangeRateId'> & {
  valueInUsd: number
}

export type CurrencyWithValue = Currency & {
  valueInUsd: number
}

export type DailyExchangeRate = {
  id: string
  currencyValueUsd: number
  currencyId: number
  timestamp: Date
}

export type DailyExchangeRateEntry = Omit<DailyExchangeRate, 'id'>
