import { ICurrencyModel, ICurrencyService } from './currency.interfaces'
import { CurrencyServiceConstructor, CurrencyServiceGetAll, CurrencyServiceGetMapMostRecentCurrencyValues, RecentCurrencyValues } from './currency.types'

export default class CurrencyService implements ICurrencyService {
  private readonly currencyModel: ICurrencyModel

  constructor ({ currencyModel }: CurrencyServiceConstructor) {
    this.currencyModel = currencyModel
  }

  getAll: CurrencyServiceGetAll = async () => {
    return await this.currencyModel.getAll()
  }

  getMapMostRecentCurrencyValues: CurrencyServiceGetMapMostRecentCurrencyValues = async () => {
    // TODO: check the performance of this function
    // Maybe is calling too many times to the db
    const currencies = await this.getAll()

    const mostRecentDailyExchangeValuesPromises = []

    for (const currency of currencies) {
      mostRecentDailyExchangeValuesPromises.push(
        this.currencyModel.getLastDailyExchangeRateByCurrencyId(currency.id)
      )
    }

    const mostRecentDailyExchangeValuesResponses = await Promise.all(mostRecentDailyExchangeValuesPromises)

    const currencyMap: RecentCurrencyValues = {}

    for (const recentDailyExchangeValue of mostRecentDailyExchangeValuesResponses) {
      if (recentDailyExchangeValue) {
        const { currencyId, id } = recentDailyExchangeValue
        currencyMap[currencyId] = id
      }
    }

    return currencyMap
  }
}
