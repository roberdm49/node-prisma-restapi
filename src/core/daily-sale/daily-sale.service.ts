import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'
import { DailySaleServiceContructor, DailySaleServiceCreate, DailySaleServiceDailySaleBelongToTenant, DailySaleServiceGetAll, DailySaleServiceGetOneById } from './daily-sale.types'

export default class DailySaleService implements IDailySaleService {
  private readonly dailySaleModel: IDailySaleModel

  constructor ({ dailySaleModel }: DailySaleServiceContructor) {
    this.dailySaleModel = dailySaleModel
  }

  getAll: DailySaleServiceGetAll = async (tenantId) => {
    return await this.dailySaleModel.getAll(tenantId)
  }

  create: DailySaleServiceCreate = async (tenantId) => {
    return await this.dailySaleModel.create(tenantId)
  }

  getOneById: DailySaleServiceGetOneById = async (dailySaleId) => {
    return await this.dailySaleModel.getOneById(dailySaleId)
  }

  dailySaleBelongToTenant: DailySaleServiceDailySaleBelongToTenant = async (tenantId, dailySale) => {
    return (dailySale.tenantId === tenantId)
  }
}
