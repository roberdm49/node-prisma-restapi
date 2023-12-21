import { IDailySale } from './daily-sale.interfaces'

export type TDailySaleModelGetAll = () => Promise<IDailySale[]>

export type TDailySaleServiceGetAll = () => Promise<IDailySale[]>
