import prisma from '@/db'
import { ICurrencyModel } from './currency.interfaces'
import { TCurrencyModelGetAll } from './currency.types'

export default class CurrencyModel implements ICurrencyModel {
  getAll: TCurrencyModelGetAll = async () => {
    return await prisma.currency.findMany()
  }
}
