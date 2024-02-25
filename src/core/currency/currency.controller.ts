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

  createNewCurrencyHistories: RequestHandler = async (request, response, next) => {
    try {
      const currencies: CurrencyEntry[] = request.body
      const newCurrencyHistories = await this.currencyService.createNewCurrencyHistories(currencies)
      return response.status(HttpStatus.Created).json(newCurrencyHistories)
    } catch (error) {
      next(error)
    }
  }
}
