import { IDailySaleRepository, IDailySaleService } from './daily-sale.interfaces'
import { DailySaleServiceContructor, DailySaleServiceCreate, DailySaleServiceDailySaleBelongToTenant, DailySaleServiceGetAll, DailySaleServiceGetOneById } from './daily-sale.types'

export default class DailySaleService implements IDailySaleService {
  private readonly dailySaleRepository: IDailySaleRepository

  constructor ({ dailySaleRepository }: DailySaleServiceContructor) {
    this.dailySaleRepository = dailySaleRepository
  }

  getAll: DailySaleServiceGetAll = async (tenantId) => {
    return await this.dailySaleRepository.getAll(tenantId)
  }

  create: DailySaleServiceCreate = async (tenantId) => {
    return await this.dailySaleRepository.create(tenantId)
  }

  getOneById: DailySaleServiceGetOneById = async (dailySaleId) => {
    return await this.dailySaleRepository.getOneById(dailySaleId)
  }

  dailySaleBelongToTenant: DailySaleServiceDailySaleBelongToTenant = async (tenantId, dailySale) => {
    return (dailySale.tenantId === tenantId)
  }
}
