import { getMergedCurrenciesWithTargetDailyExchanges, getMergedCurrenciesWithValues } from '@/utils/transformationsCurrency'
import { ICurrencyRepository, ICurrencyService } from './currency.interfaces'
import {
  CurrencyServiceConstructor,
  CurrencyServiceCreateNewCurrencyHistories,
  CurrencyServiceGetAll,
  CurrencyServiceUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export default class CurrencyService implements ICurrencyService {
  private readonly currencyRepository: ICurrencyRepository

  constructor ({ currencyRepository }: CurrencyServiceConstructor) {
    this.currencyRepository = currencyRepository
  }

  getAll: CurrencyServiceGetAll = async () => {
    return await this.currencyRepository.getAll()
  }

  createNewCurrencyHistories: CurrencyServiceCreateNewCurrencyHistories = async (currenciesWithValuesButWithoutIds) => {
    const currenciesIsoCodes = currenciesWithValuesButWithoutIds.map(currency => currency.isoCode)
    const currenciesWithIdsButWithoutValues = await this.currencyRepository.getManyByIsoCodes(currenciesIsoCodes)
    const currenciesWithIdsAndValues = getMergedCurrenciesWithValues(currenciesWithIdsButWithoutValues, currenciesWithValuesButWithoutIds)

    const createdDailyExchanges = await this.currencyRepository.createNewCurrencyHistories(currenciesWithIdsAndValues)

    // The currencies above do not have the dailyexchangerateid, it's optional so the good practice should be create a new type (maybe)
    // TODO: refactor the types to make it more understandable
    const currenciesWithDailyExchange = getMergedCurrenciesWithTargetDailyExchanges(currenciesWithIdsAndValues, createdDailyExchanges)
    return currenciesWithDailyExchange
  }

  updateCurrencyWithLatestExchangeRates: CurrencyServiceUpdateCurrencyWithLatestExchangeRates = async (currencies) => {
    return await this.currencyRepository.updateCurrencyWithLatestExchangeRates(currencies)
  }
}
