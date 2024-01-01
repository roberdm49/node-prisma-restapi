import prisma from '@/db'
import { ICurrencyModel } from './currency.interfaces'
import { CurrencyModelGetAll } from './currency.types'

export default class CurrencyModel implements ICurrencyModel {
  getAll: CurrencyModelGetAll = async () => {
    return await prisma.currency.findMany()
  }
}
