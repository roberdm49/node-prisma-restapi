import supertest from 'supertest'
import app from '@/app'
import { cleanUpAll } from '@/utils/testing'
// import prisma from '@/config/db'

const api = supertest(app)

describe('Company', () => {
  const mockCompany = { name: 'Mock Company' }

  const tenantInformation1 = {
    tenantName: 'tenant1',
    username: 'username1',
    firstname: 'firstname1',
    lastname: 'lastname1',
    password: 'password1'
  }

  let cookies: string[] = []

  beforeEach(async () => {
    await cleanUpAll()

    await api
      .post('/auth/sign-up')
      .send({ ...tenantInformation1 })

    const loginResponse = await api
      .post('/auth/log-in')
      .send({
        username: tenantInformation1.username,
        password: tenantInformation1.password
      })

    cookies = JSON.parse(JSON.stringify(loginResponse.headers['set-cookie']))

    const res = await api
      .post('/company/create')
      .send(mockCompany)
      .set('Cookie', cookies)
    console.log({ res })
  })

  test('Should retrieve all companies', async () => {
    const response = await api
      .get('/company/get')
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body).toHaveLength(3)
  })
})