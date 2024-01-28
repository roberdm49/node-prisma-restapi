import { Router } from 'express'
import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'

export type DailySaleModelGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleModelCreate = (tenantId: string) => Promise<unknown>

export type DailySaleServiceGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleServiceCreate = (tenantId: string) => Promise<unknown>

export type DailySaleCreateRoutes = ({ dailySaleModel }: { dailySaleModel: IDailySaleModel }) => Router

export type DailySaleServiceContructor = {
  dailySaleModel: IDailySaleModel
}

export type DailySaleControllerConstructor = {
  dailySaleService: IDailySaleService
}

export type DailySale = {
  id?: string
  saleDate?: Date
  closed?: boolean
  tenantId: string
}
