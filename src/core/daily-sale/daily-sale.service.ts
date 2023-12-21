import { IDailySaleModel, IDailySaleService } from './daily-sale.interfaces'
import { TDailySaleServiceGetAll } from './daily-sale.types'

export default class DailySaleService implements IDailySaleService {
  private readonly dailySaleModel: IDailySaleModel

  constructor ({ dailySaleModel }: { dailySaleModel: IDailySaleModel }) {
    this.dailySaleModel = dailySaleModel
  }

  getAll: TDailySaleServiceGetAll = async () => {
    return await this.dailySaleModel.getAll()
  }
}
