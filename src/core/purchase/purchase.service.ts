import { IPurchaseModel, IPurchaseService } from './purchase.interfaces'
import { TPurchaseServiceGetAll } from './purchase.types'

export default class PurchaseService implements IPurchaseService {
  private readonly purchaseModel: IPurchaseModel

  constructor ({ purchaseModel }: { purchaseModel: IPurchaseModel }) {
    this.purchaseModel = purchaseModel
  }

  getAll: TPurchaseServiceGetAll = async () => {
    return await this.purchaseModel.getAll()
  }
}
