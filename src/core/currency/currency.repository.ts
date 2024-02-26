import prisma from '@/config/db'
import { ICurrencyRepository } from './currency.interfaces'
import {
  CurrencyRepositoryCreateNewCurrencyHistories,
  CurrencyRepositoryGetAll,
  CurrencyRepositoryGetManyByIsoCodes,
  CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export default class CurrencyRepository implements ICurrencyRepository {
  getAll: CurrencyRepositoryGetAll = async () => {
    return await prisma.currency.findMany()
  }

  getManyByIsoCodes: CurrencyRepositoryGetManyByIsoCodes = async (isoCodes) => {
    return await prisma.currency.findMany({
      where: {
        isoCode: {
          in: isoCodes
        }
      }
    })
  }

  createNewCurrencyHistories: CurrencyRepositoryCreateNewCurrencyHistories = async (currenciesWithFullData) => {
    const newExchangeRatePendents = []

    for (const currency of currenciesWithFullData) {
      const newExchangeRate = prisma.dailyExchangeRate.create({
        data: {
          currencyValueUsd: currency.valueInUsd,
          currency: {
            connect: {
              id: currency.id
            }
          }
        }
      })

      newExchangeRatePendents.push(newExchangeRate)
    }

    return await prisma.$transaction(newExchangeRatePendents)
  }

  updateCurrencyWithLatestExchangeRates: CurrencyRepositoryUpdateCurrencyWithLatestExchangeRates = async (currenciesWithValues) => {
    const currenciesToUpdate = []

    for (const currency of currenciesWithValues) {
      currenciesToUpdate.push(
        prisma.currency.update({
          where: { id: currency.id },
          data: {
            latestExchangeRateId: currency.recentExchangeRateId
          }
        })
      )
    }

    return await prisma.$transaction(currenciesToUpdate)
  }
}
