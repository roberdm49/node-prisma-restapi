import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { PurchaseServiceConstructor, PurchaseServiceGetAll } from './purchase.types'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel

  constructor ({ purchaseModel }: PurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
  }

  getAll: PurchaseServiceGetAll = async () => {
    return await this.purchaseModel.getAll()
  }
}
