import { Router } from 'express'
import { ICurrencyModel, ICurrencyService } from './currency.interfaces'

export type CurrencyModelGetAll = () => Promise<Currency[]>
export type CurrencyModelGetLastDailyExchangeRate = () => Promise<DailyExchangeRate | null>
export type CurrencyModelGetLastDailyExchangeRateByCurrencyId = (currencyId: number) => Promise<DailyExchangeRate | null>

export type CurrencyServiceGetAll = () => Promise<Currency[]>
export type CurrencyServiceGetMapMostRecentCurrencyValues = () => Promise<RecentCurrencyValues>

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
  isoCode: string | null
  isoNum: string | null
}

export type DailyExchangeRate = {
  id: string
  currencyValueUsd: number
  timestamp: Date
  currencyId: number
}

export type RecentCurrencyValues = {
  [currencyId: number]: string
}
