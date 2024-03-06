import supertest from 'supertest'
import app from '@/app'
import { cleanUpAll, createMockCurrency } from '@/utils/testing'
// import prisma from '@/config/db'

const api = supertest(app)

describe('Currency', () => {
  let cookies: string[] = []

  beforeEach(async () => {
    const tenantName = 'tenant'
    const username = 'username'
    const firstname = 'firstname'
    const lastname = 'lastname'
    const password = 'password'

    await cleanUpAll()
    await createMockCurrency()

    await api
      .post('/auth/sign-up')
      .send({ tenantName, username, firstname, lastname, password })

    const loginResponse = await api
      .post('/auth/log-in')
      .send({ username, password })

    cookies = JSON.parse(JSON.stringify(loginResponse.headers['set-cookie']))
  })

  test('Should retrieve all currencies', async () => {
    await api
      .get('/currency/get')
      .set('Cookie', cookies)
      .expect(200)
  })
})
