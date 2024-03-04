import supertest from 'supertest'
import app from '@/app'
import { cleanUpAll, createMockCurrency } from '@/utils/testing'
import prisma from '@/config/db'

const api = supertest(app)

describe('Currency', () => {
  const cookies: any[] = []

  beforeEach(async () => {
    const tenantName = 'tenant'
    const username = 'username'
    const firstname = 'firstname'
    const lastname = 'lastname'
    const password = 'password'

    await cleanUpAll()
    await createMockCurrency()

    const tenants = await prisma.tenant.findMany()
    console.log({ tenants })
    const currencies = await prisma.currency.findMany()
    console.log({ currencies })

    await api
      .post('/auth/sign-up')
      .send({ tenantName, username, firstname, lastname, password })

    const loginResponse = await api
      .post('/auth/log-in')
      .send({ username, password })

    console.log({ cookies })
    // TODO: parse headers[...] because it has "string" type implicitily
    const cookies2 = loginResponse.headers['set-cookie']
    console.log({ cookies2 })
    console.log(typeof cookies2)
    console.log('cookies2 is array?', Array.isArray(cookies2))
  })

  test('Should retrieve all currencies', async () => {
    /*
    await api
      // should put cookies right here
      .get('/currency/get')
      .expect(201)
    */
  })
})
