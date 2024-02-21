import { Router } from 'express'
import { ICurrencyModel, ICurrencyService } from './currency.interfaces'

export type CurrencyModelGetAll = () => Promise<Currency[]>

export type CurrencyServiceGetAll = () => Promise<Currency[]>

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
  isoCode?: string | null
  isoNum?: string | null
}
