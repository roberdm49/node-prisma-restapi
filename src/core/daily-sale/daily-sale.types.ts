import { Router } from 'express'
import { IDailySaleRepository, IDailySaleService } from './daily-sale.interfaces'

export type DailySaleRepositoryGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleRepositoryCreate = (tenantId: string) => Promise<DailySale>
export type DailySaleRepositoryGetOneById = (dailySaleId: string) => Promise<DailySale | null>
export type DailySaleRepositoryGetOneByDate = (tenantId: string, currentDate: Date) => Promise<DailySale | null>
export type DailySaleRepositoryClose = (dailySale: DailySale) => Promise<DailySale>

export type DailySaleServiceGetAll = (tenantId: string) => Promise<DailySale[]>
export type DailySaleServiceCreate = (tenantId: string) => Promise<unknown>
export type DailySaleServiceGetOneById = (dailySaleId: string) => Promise<DailySale | null>
export type DailySaleServiceDailySaleBelongToTenant = (tenantId: string, dailySale: DailySale) => Promise<boolean>
export type DailySaleServiceClose = (tenantId: string) => Promise<DailySale>

export type DailySaleCreateRoutes = ({ dailySaleRepository }: { dailySaleRepository: IDailySaleRepository }) => Router

export type DailySaleServiceContructor = {
  dailySaleRepository: IDailySaleRepository
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
