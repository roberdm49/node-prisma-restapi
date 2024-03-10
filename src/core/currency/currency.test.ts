import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll, createMockCurrency } from '@/utils/testing'
import { GlobalEnv } from '@/utils/constants'

const app = createApp()
const api = supertest(app)

describe('Currency', () => {
  const mockCurrency1 = { id: 123, isoCode: 'ABC', isoNum: '001', name: 'Dummy1' }
  const mockCurrency2 = { id: 456, isoCode: 'DEF', isoNum: '045', name: 'Dummy2' }
  const tenantInformation = {
    tenantName: 'tenant',
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    password: 'password'
  }

  let cookies: string[] = []

  beforeEach(async () => {
    await cleanUpAll()
    await createMockCurrency({ ...mockCurrency1 })
    await createMockCurrency({ ...mockCurrency2 })

    await api
      .post('/auth/sign-up')
      .send({ ...tenantInformation })

    const loginResponse = await api
      .post('/auth/log-in')
      .send({
        username: tenantInformation.username,
        password: tenantInformation.password
      })

    cookies = JSON.parse(JSON.stringify(loginResponse.headers['set-cookie']))
  })

  describe('Happy paths', () => {
    test('Should retrieve all currencies', async () => {
      const response = await api
        .get('/currency/get')
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toHaveLength(2)
    })

    test('Should have access and create a new daily exchange entry', async () => {
      const valueInUsd = 0.1
      const payload = [
        {
          name: mockCurrency1.name,
          isoCode: mockCurrency1.isoCode,
          isoNum: mockCurrency1.isoNum,
          valueInUsd
        }
      ]

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send(payload)
        .expect(201)
    })
  })

  describe('Exception paths', () => {
    test('Should not access to the create and update currencies endpoint', async () => {
      await api
        .post('/currency/create-and-update-currencies')
        .set('Cookie', cookies)
        .expect(403)
    })

    test('Should throw an error if the payload is malformed', async () => {
      const valueInUsd = 0.1
      const payload = [
        {
          name: mockCurrency1.name,
          isoCode: mockCurrency1.isoCode,
          isoNum: mockCurrency1.isoNum,
          valueInUsd
        }
      ]

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send({ ...payload, description: 'description' })
        .expect(400)

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send({ ...payload, name: 123 })
        .expect(400)

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send({ ...payload, valueInUsd: -1.5 })
        .expect(400)

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send({ ...payload, valueInUsd: 0 })
        .expect(400)

      await api
        .post('/currency/create-and-update-currencies')
        .set({ Authorization: `Bearer ${GlobalEnv.CRON_SECRET}` })
        .send({ name: 'name', isoCode: 'ABC', isoNum: '012' })
        .expect(400)
    })
  })
})
