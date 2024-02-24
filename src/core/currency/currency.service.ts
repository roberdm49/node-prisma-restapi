import { ICurrencyModel, ICurrencyService } from './currency.interfaces'
import { CurrencyServiceConstructor, CurrencyServiceGetAll } from './currency.types'

export default class CurrencyService implements ICurrencyService {
  private readonly currencyModel: ICurrencyModel

  constructor ({ currencyModel }: CurrencyServiceConstructor) {
    this.currencyModel = currencyModel
  }

  getAll: CurrencyServiceGetAll = async () => {
    return await this.currencyModel.getAll()
  }
}
