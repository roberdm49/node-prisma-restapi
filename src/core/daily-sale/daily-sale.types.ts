import { Router } from 'express'
import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'

export type DailySaleModelGetAll = () => Promise<DailySale[]>

export type DailySaleServiceGetAll = () => Promise<DailySale[]>

export type DailySaleCreateRoutes = ({ dailySaleModel }: { dailySaleModel: IDailySaleModel }) => Router

export type DailySaleServiceContructor = {
  dailySaleModel: IDailySaleModel
}

export type DailySaleControllerConstructor = {
  dailySaleService: IDailySaleService
}

export type DailySale = {
  id?: string
  saleDate: Date
  closed: boolean
  tenantId: string
}
