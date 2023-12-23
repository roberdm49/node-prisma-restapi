import { IPurchaseModel, IPurchaseService, IPurchaseServiceConstructor } from './purchase.interfaces'
import { TPurchaseServiceGetAll } from './purchase.types'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel

  constructor ({ purchaseModel }: IPurchaseServiceConstructor) {
    this.purchaseModel = purchaseModel
  }

  getAll: TPurchaseServiceGetAll = async () => {
    return await this.purchaseModel.getAll()
  }
}
