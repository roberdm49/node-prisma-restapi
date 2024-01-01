import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'
import { DailySaleServiceContructor, DailySaleServiceGetAll } from './daily-sale.types'

export default class DailySaleService implements IDailySaleService {
  private readonly dailySaleModel: IDailySaleModel

  constructor ({ dailySaleModel }: DailySaleServiceContructor) {
    this.dailySaleModel = dailySaleModel
  }

  getAll: DailySaleServiceGetAll = async () => {
    return await this.dailySaleModel.getAll()
  }
}
