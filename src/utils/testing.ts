import chalk from 'chalk'
import prisma from '@/config/db'
import { GlobalEnv } from './constants'

const isEffectivelyTestEnvironment = (): boolean => {
  if (GlobalEnv.APP_RUNTIME_ENV !== 'test') return false
  if (!GlobalEnv.DB_NAME.endsWith('test')) return false

  return true
}

if (!isEffectivelyTestEnvironment()) {
  console.error(chalk.bold.redBright('Cannot execute testing functions on non-testing runtime environments!'))
  process.exit(1)
}

export const cleanUpAll = async (): Promise<unknown> => {
  const pendentTransactions = [
    prisma.purchasedItem.deleteMany(),
    prisma.purchase.deleteMany(),
    prisma.dailySale.deleteMany(),
    prisma.dailyExchangeRate.deleteMany(),
    prisma.productHistory.deleteMany(),
    prisma.product.deleteMany(),
    prisma.company.deleteMany(),
    prisma.user.deleteMany(),
    prisma.tenant.deleteMany(),
    prisma.currency.deleteMany()
  ]

  return await prisma.$transaction(pendentTransactions)
}

export const createMockCurrency = async ({
  id = 123,
  isoCode = 'DUM',
  isoNum = '456',
  name = 'Dummy'
}: {
  id?: number
  isoCode?: string
  isoNum?: string
  name?: string
} = {}): Promise<unknown> => {
  return await prisma.currency.create({
    data: {
      id,
      isoCode,
      isoNum,
      name,
      dailyExchangeRates: {
        create: {
          currencyValueUsd: 0.5
        }
      }
    }
  })
}
