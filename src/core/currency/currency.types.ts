import { Router } from 'express'
import { ICurrencyRepository, ICurrencyService } from './currency.interfaces'

export type CurrencyRepositoryGetAll = () => Promise<CurrencyWithHistoryMetadataArray[]>
export type CurrencyRepositoryGetManyByIsoCodes = (isoCodes: string[]) => Promise<CurrencyWithHistoryMetadataArray[]>
export type CurrencyRepositoryCreateNewCurrencyHistories = (currencies: CurrencyWithValue[]) => Promise<DailyExchangeRate[]>
export type CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyServiceGetAll = () => Promise<CurrencyWithSingleHistoryMetadata[]>
export type CurrencyServiceCreateNewCurrencyHistories = (currencies: CurrencyEntry[]) => Promise<CurrencyWithValue[]>
export type CurrencyServiceUpdateCurrencyWithLatestExchangeRates = (currencies: CurrencyWithValue[]) => Promise<Currency[]>

export type CurrencyCreateRoutes = ({ currencyRepository }: { currencyRepository: ICurrencyRepository }) => Router

export type CurrencyServiceConstructor = {
  currencyRepository: ICurrencyRepository
}

export type CurrencyControllerConstructor = {
  currencyService: ICurrencyService
}

export type HistoryMetadata = {
  id: string
  timestamp: Date
}

export type Currency = {
  id: number
  name: string
  isoCode: string
  isoNum: string
}

export type CurrencyWithHistoryMetadataArray = Currency & {
  dailyExchangeRates: HistoryMetadata[]
}

export type CurrencyWithSingleHistoryMetadata = Currency & {
  lastExchangeRate: HistoryMetadata | null
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
