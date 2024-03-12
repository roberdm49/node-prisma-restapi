import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll, createMockCurrency } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Purchases', () => {
  const tenantInformation1 = {
    tenantName: 'tenant1',
    username: 'username1',
    firstname: 'firstname1',
    lastname: 'lastname1',
    password: 'password1'
  }

  const tenantInformation2 = {
    tenantName: 'tenant2',
    username: 'username2',
    firstname: 'firstname2',
    lastname: 'lastname2',
    password: 'password2'
  }

  const currency = {
    id: 1,
    isoCode: 'DUM',
    isoNum: '012',
    name: 'Dummy'
  }

  const products1 = [
    {
      name: 'Product',
      price: 20,
      currencyId: currency.id
    }
  ]

  const products2 = [
    {
      name: 'Test',
      price: 10,
      currencyId: currency.id
    },
    {
      name: 'Coffee',
      price: 15,
      currencyId: currency.id
    }
  ]

  let cookies1: string[] = []
  let cookies2: string[] = []

  beforeEach(async () => {
    await cleanUpAll()
    await createMockCurrency(currency)

    await api.post('/auth/sign-up').send(tenantInformation1)
    await api.post('/auth/sign-up').send(tenantInformation2)

    const loginResponse1 = await api.post('/auth/log-in').send({ username: tenantInformation1.username, password: tenantInformation1.password })
    const loginResponse2 = await api.post('/auth/log-in').send({ username: tenantInformation2.username, password: tenantInformation2.password })

    cookies1 = JSON.parse(JSON.stringify(loginResponse1.headers['set-cookie']))
    cookies2 = JSON.parse(JSON.stringify(loginResponse2.headers['set-cookie']))
  })

  describe('Happy paths', () => {
    it('Should create a new purchase', async () => {
      const createProductsResponse = await api.post('/products/create').set('Cookie', cookies1).send(products1).expect(201)
      const dailySaleResponse = await api.post('/daily-sale/create').set('Cookie', cookies1).expect(201)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({
          dailySaleId: dailySaleResponse.body.id,
          purchasedItems: [
            {
              id: createProductsResponse.body[0].id,
              quantity: 2
            }
          ]
        })
        .expect(400)
    })
  })

  describe('Exception paths', () => {

  })
})
