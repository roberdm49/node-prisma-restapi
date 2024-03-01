import { prismaMock } from '../../jest/singleton'
import CurrencyRepository from './currency.repository'
import CurrencyService from './currency.service'

test('should create new user ', async () => {
  const currencyRepository = new CurrencyRepository()
  const currencyService = new CurrencyService({ currencyRepository })

  await expect(currencyService.getAll()).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: true
  })
})
