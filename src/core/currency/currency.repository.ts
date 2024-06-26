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
    return await prisma.currency.findMany({
      include: {
        dailyExchangeRates: {
          select: {
            id: true,
            timestamp: true
          },
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    })
  }

  getManyByIsoCodes: CurrencyRepositoryGetManyByIsoCodes = async (isoCodes) => {
    return await prisma.currency.findMany({
      where: {
        isoCode: {
          in: isoCodes
        }
      },
      include: {
        dailyExchangeRates: {
          select: {
            id: true,
            timestamp: true
          },
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
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
            // TODO: MODIFY!!!
          }
        })
      )
    }

    return await prisma.$transaction(currenciesToUpdate)
  }
}
