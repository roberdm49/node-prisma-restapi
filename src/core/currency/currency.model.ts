import prisma from '@/config/db'
import { ICurrencyModel } from './currency.interfaces'
import { CurrencyModelGetAll, CurrencyModelGetLastDailyExchangeRate, CurrencyModelGetLastDailyExchangeRateByCurrencyId } from './currency.types'

export default class CurrencyModel implements ICurrencyModel {
  getAll: CurrencyModelGetAll = async () => {
    return await prisma.currency.findMany()
  }

  getLastDailyExchangeRate: CurrencyModelGetLastDailyExchangeRate = async () => {
    return await prisma.dailyExchangeRate.findFirst({
      orderBy: {
        timestamp: 'desc'
      }
    })
  }

  getLastDailyExchangeRateByCurrencyId: CurrencyModelGetLastDailyExchangeRateByCurrencyId = async (currencyId) => {
    return await prisma.dailyExchangeRate.findFirst({
      where: {
        currencyId
      },
      orderBy: {
        timestamp: 'desc'
      }
    })
  }
}
