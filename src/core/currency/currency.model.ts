import prisma from '@/config/db'
import { ICurrencyModel } from './currency.interfaces'
import {
  CurrencyModelCreateNewCurrencyHistories,
  CurrencyModelGetAll,
  CurrencyModelGetManyByIsoCodes,
  CurrencyModelUpdateCurrencyWithLatestExchangeRates
} from './currency.types'

export default class CurrencyModel implements ICurrencyModel {
  getAll: CurrencyModelGetAll = async () => {
    return await prisma.currency.findMany()
  }

  getManyByIsoCodes: CurrencyModelGetManyByIsoCodes = async (isoCodes) => {
    return await prisma.currency.findMany({
      where: {
        isoCode: {
          in: isoCodes
        }
      }
    })
  }

  createNewCurrencyHistories: CurrencyModelCreateNewCurrencyHistories = async (currenciesWithFullData) => {
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

  updateCurrencyWithLatestExchangeRates: CurrencyModelUpdateCurrencyWithLatestExchangeRates = async (currenciesWithValues) => {
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
