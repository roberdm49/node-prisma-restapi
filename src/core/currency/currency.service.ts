import { getMergedCurrenciesWithTargetDailyExchanges, getMergedCurrenciesWithValues } from '@/utils/transformationsCurrency'
import { ICurrencyModel, ICurrencyService } from './currency.interfaces'
import {
  CurrencyServiceConstructor,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
  CurrencyServiceGetManyByIsoCodes,
  CurrencyServiceUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export default class CurrencyService implements ICurrencyService {
  private readonly currencyModel: ICurrencyModel

  constructor ({ currencyModel }: CurrencyServiceConstructor) {
    this.currencyModel = currencyModel
  }

  getAll: CurrencyServiceGetAll = async () => {
    return await this.currencyModel.getAll()
  }

  getManyByIsoCodes: CurrencyServiceGetManyByIsoCodes = async (isoCodes) => {
    return await this.currencyModel.getManyByIsoCodes(isoCodes)
  }

  createNewCurrencyHistories: CurrencyServiceCreateNewCurrencyHistories = async (currenciesWithValuesButWithoutIds) => {
    const currenciesIsoCodes = currenciesWithValuesButWithoutIds.map(currency => currency.isoCode)
    const currenciesWithIdsButWithoutValues = await this.currencyModel.getManyByIsoCodes(currenciesIsoCodes)
    const currenciesWithIdsAndValues = getMergedCurrenciesWithValues(currenciesWithIdsButWithoutValues, currenciesWithValuesButWithoutIds)

    const createdDailyExchanges = await this.currencyModel.createNewCurrencyHistories(currenciesWithIdsAndValues)

    // The currencies above do not have the dailyexchangerateid, it's optional so the good practice should be create a new type (maybe)
    // TODO: refactor the types to make it more understandable
    const currenciesWithDailyExchange = getMergedCurrenciesWithTargetDailyExchanges(currenciesWithIdsAndValues, createdDailyExchanges)
    return currenciesWithDailyExchange
  }

  updateCurrencyWithLatestExchangeRates: CurrencyServiceUpdateCurrencyWithLatestExchangeRates = async (currencies) => {
    return await this.currencyModel.updateCurrencyWithLatestExchangeRates(currencies)
  }
}
