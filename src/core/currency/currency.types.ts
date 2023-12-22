import { ICurrency } from './currency.interfaces'

export type TCurrencyModelGetAll = () => Promise<ICurrency[]>

export type TCurrencyServiceGetAll = () => Promise<ICurrency[]>
