import { Router } from 'express'
import { ICurrencyRepository, ICurrencyService } from './currency.interfaces'

export type CurrencyRepositoryGetAll = () => Promise<Currency[]>
export type CurrencyRepositoryCreateNewCurrencyHistories = (currencies: CurrencyWithValue[]) => Promise<DailyExchangeRate[]>
export type CurrencyRepositoryGetManyByIsoCodes = (isoCodes: string[]) => Promise<Currency[]>
export type CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyServiceGetAll = () => Promise<Currency[]>
export type CurrencyServiceCreateNewCurrencyHistories = (currencies: CurrencyEntry[]) => Promise<CurrencyWithValue[]>
export type CurrencyServiceGetManyByIsoCodes = (isoCodes: string[]) => Promise<Currency[]>
export type CurrencyServiceUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyCreateRoutes = ({ currencyRepository }: { currencyRepository: ICurrencyRepository }) => Router

export type CurrencyServiceConstructor = {
  currencyRepository: ICurrencyRepository
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
