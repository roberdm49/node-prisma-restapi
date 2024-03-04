import prisma from '@/config/db'
import CurrencyRepository from './currency.repository'
import { cleanUpAll, setDummyCurrency } from '@/utils/testing'

describe('Currency', () => {
  beforeEach(async () => {
    await cleanUpAll()
    await setDummyCurrency()
  })

  test('Currency', async () => {
    const currencyRepository = new CurrencyRepository()

    const after = await currencyRepository.getAll()
    console.log({ after })

    await expect(currencyRepository.getAll()).resolves.toEqual({
      id: 1,
      name: 'Rich',
      email: 'hello@prisma.io',
      acceptTermsAndConditions: true
    })
  })
})
