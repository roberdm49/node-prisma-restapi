import { Router } from 'express'
import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'

export type DailySaleModelGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleModelCreate = (tenantId: string) => Promise<DailySale>
export type DailySaleModelGetOneById = (dailySaleId: string) => Promise<DailySale | null>
export type DailySaleModelGetManyByTenantId = (tenantId: string) => Promise<DailySale[]>

export type DailySaleServiceGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleServiceCreate = (tenantId: string) => Promise<unknown>
export type DailySaleServiceGetManyByTenantId = (tenantId: string) => Promise<DailySale[]>

export type DailySaleCreateRoutes = ({ dailySaleModel }: { dailySaleModel: IDailySaleModel }) => Router

export type DailySaleServiceContructor = {
  dailySaleModel: IDailySaleModel
}

export type DailySaleControllerConstructor = {
  dailySaleService: IDailySaleService
}

export type DailySale = {
  id: string
  saleDate: Date
  closed: boolean
  tenantId: string
}

export type DailySaleEntry = Omit<DailySale, 'id' | 'saleDate' | 'closed'>
