import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'
import { DailySaleServiceContructor, DailySaleServiceCreate, DailySaleServiceGetAll, DailySaleServiceGetManyByTenantId } from './daily-sale.types'

export default class DailySaleService implements IDailySaleService {
  private readonly dailySaleModel: IDailySaleModel

  constructor ({ dailySaleModel }: DailySaleServiceContructor) {
    this.dailySaleModel = dailySaleModel
  }

  getAll: DailySaleServiceGetAll = async (tenantId) => {
    return await this.dailySaleModel.getAll(tenantId)
  }

  getManyByTenantId: DailySaleServiceGetManyByTenantId = async (tenantId) => {
    return await this.dailySaleModel.getManyByTenantId(tenantId)
  }

  create: DailySaleServiceCreate = async (tenantId) => {
    return await this.dailySaleModel.create(tenantId)
  }
}
