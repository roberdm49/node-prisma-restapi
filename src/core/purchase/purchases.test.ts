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

  let cookies1: string[] = []

  beforeEach(async () => {
    await cleanUpAll()
    await createMockCurrency(currency)

    await api.post('/auth/sign-up').send(tenantInformation1)
    await api.post('/auth/sign-up').send(tenantInformation2)

    const loginResponse1 = await api.post('/auth/log-in').send({ username: tenantInformation1.username, password: tenantInformation1.password })

    cookies1 = JSON.parse(JSON.stringify(loginResponse1.headers['set-cookie']))
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
        .expect(201)

      const getResponse = await api
        .get('/purchase/get')
        .set('Cookie', cookies1)
        .expect(200)

      expect(getResponse.body).toHaveLength(1)
    })
  })

  describe('Exception paths', () => {
    it('Should throw an error if credetianls are missins', async () => {
      const createProductsResponse = await api.post('/products/create').set('Cookie', cookies1).send(products1).expect(201)
      const dailySaleResponse = await api.post('/daily-sale/create').set('Cookie', cookies1).expect(201)

      await api
        .post('/purchase/create')
        .send({ dailySaleId: dailySaleResponse.body.id, purchasedItems: [{ id: createProductsResponse.body[0].id, quantity: 2 }] })
        .expect(401)

      await api
        .get('/purchase/get')
        .expect(401)
    })

    it('Should not create a new purchase if the request is malformed', async () => {
      const createProductsResponse = await api.post('/products/create').set('Cookie', cookies1).send(products1).expect(201)
      const dailySaleResponse = await api.post('/daily-sale/create').set('Cookie', cookies1).expect(201)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({ dailySaleId: dailySaleResponse.body.id, purchasedItems: [{ id: createProductsResponse.body[0].id, quantity: '2' }] })
        .expect(400)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({ dailySaleId: dailySaleResponse.body.id, purchasedItems: { id: createProductsResponse.body[0].id, quantity: 2 } })
        .expect(400)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({ dailySaleId: dailySaleResponse.body.id, purchasedItems: [{ id: '123', quantity: 2 }] })
        .expect(400)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({ dailySaleId: dailySaleResponse.body.id, purchasedItems: [{ id: '123', quantity: 2 }], extraField: 123 })
        .expect(400)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .send({ dailySaleId: '123', purchasedItems: [{ id: createProductsResponse.body[0].id, quantity: 2 }] })
        .expect(400)

      await api
        .post('/purchase/create')
        .set('Cookie', cookies1)
        .expect(400)
    })
  })
})
