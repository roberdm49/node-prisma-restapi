import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceCreate, PurchaseServiceGetAll } from './purchase.types'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel

  constructor ({ purchaseModel }: PurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
  }

  getAll: PurchaseServiceGetAll = async (tenantId) => {
    return await this.purchaseModel.getAll(tenantId)
  }

  create: PurchaseServiceCreate = async (tenantId, dailySaleId, purchases) => {
    return await this.purchaseModel.create(tenantId, dailySaleId, purchases)
  }
}
