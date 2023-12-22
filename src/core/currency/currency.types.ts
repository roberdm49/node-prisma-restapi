import { Router } from 'express'
import { ICurrency, ICurrencyModel } from './currency.interfaces'

export type TCurrencyModelGetAll = () => Promise<ICurrency[]>

export type TCurrencyServiceGetAll = () => Promise<ICurrency[]>

export type TCurrencyCreateRoutes = ({ currencyModel }: { currencyModel: ICurrencyModel }) => Router
