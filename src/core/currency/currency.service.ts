import { ICurrencyModel, ICurrencyService, ICurrencyServiceConstructor } from './currency.interfaces'
import { TCurrencyServiceGetAll } from './currency.types'

export default class CurrencyService implements ICurrencyService {
  private readonly currencyModel: ICurrencyModel

  constructor ({ currencyModel }: ICurrencyServiceConstructor) {
    this.currencyModel = currencyModel
  }

  getAll: TCurrencyServiceGetAll = async () => {
    return await this.currencyModel.getAll()
  }
}
