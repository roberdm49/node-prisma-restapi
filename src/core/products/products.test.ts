import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll, createMockCurrency } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Products', () => {
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
    it('Should create a new product and retrieve the corresponding one', async () => {
      await api.post('/products/create').set('Cookie', cookies1).send(products1).expect(201)
      await api.post('/products/create').set('Cookie', cookies2).send(products2).expect(201)

      const getResponseTenant1 = await api.get('/products/get').set('Cookie', cookies1)
      const getResponseTenant2 = await api.get('/products/get').set('Cookie', cookies2)

      expect(getResponseTenant1.body).toHaveLength(products1.length)
      expect(getResponseTenant2.body).toHaveLength(products2.length)
    })

    it('Should update an existing product', async () => {
      const createdProduct = await api.post('/products/create').set('Cookie', cookies1).send(products1).expect(201)
      const updatedProduct = await api
        .patch('/products/update')
        .set('Cookie', cookies1)
        .send([{ id: createdProduct.body[0].id, name: 'UpdatedName' }])
        .expect(200)

      expect(createdProduct.body[0].id).toBe(updatedProduct.body[0].id)
      expect(createdProduct.body[0].name).toBe(products1[0].name)
      expect(updatedProduct.body[0].name).toBe(updatedProduct.body[0].name)
    })
  })

  describe('Exception paths', () => {
    it('Should fail the request if it is malformed', async () => {
      await api.post('/products/create').set('Cookie', cookies1).send({ name: 'Test', price: 123 }).expect(400)
      await api.post('/products/create').set('Cookie', cookies1).send({ name: 'Test', price: 123, currencyId: 2 }).expect(400)
      await api.post('/products/create').set('Cookie', cookies1).send({ name: 'Test', price: 123, currencyId: 1, query: 'A query' }).expect(400)
      await api.post('/products/create').set('Cookie', cookies1).expect(400)
    })
  })
})
