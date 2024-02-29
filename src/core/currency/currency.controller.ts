import { RequestHandler } from 'express'
import { HttpStatus } from '@/enums/httpStatus'
import { ICurrencyController, ICurrencyService } from './currency.interfaces'
import { CurrencyControllerConstructor, CurrencyEntry } from './currency.types'

export default class CurrencyController implements ICurrencyController {
  private readonly currencyService: ICurrencyService

  constructor ({ currencyService }: CurrencyControllerConstructor) {
    this.currencyService = currencyService
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const currencies = await this.currencyService.getAll()
      return response.status(HttpStatus.OK).json(currencies)
    } catch (error) {
      next(error)
    }
  }

  createNewCurrencyHistoriesAndUpdateCurrenciesTarget: RequestHandler = async (request, response, next) => {
    try {
      const currencies: CurrencyEntry[] = request.body
      const currenciesWithExchanges = await this.currencyService.createNewCurrencyHistories(currencies)
      const updatedCurrencies = await this.currencyService.updateCurrencyWithLatestExchangeRates(currenciesWithExchanges)

      return response.status(HttpStatus.Created).json({
        updatedCurrencies
      })
    } catch (error) {
      next(error)
    }
  }
}
