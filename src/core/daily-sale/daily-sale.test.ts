import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Daily sale', () => {
  let cookies: string[] = []

  const tenantInformation = {
    tenantName: 'tenant1',
    username: 'username1',
    firstname: 'firstname1',
    lastname: 'lastname1',
    password: 'password1'
  }

  beforeEach(async () => {
    await cleanUpAll()

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
    it('Should create a new daily sale properly', async () => {
      await api
        .post('/daily-sale/create')
        .set('Cookie', cookies)
        .expect(201)
    })

    it('Should retrieve all daily sales for a specific tenant', async () => {
      await api
        .post('/daily-sale/create')
        .set('Cookie', cookies)
        .expect(201)

      const response = await api
        .get('/daily-sale/get')
        .set('Cookie', cookies)
        .expect(200)

      expect(response.body).toHaveLength(1)
    })

    it('Should close a daily sale in a properly way', async () => {
      const createResponse = await api
        .post('/daily-sale/create')
        .set('Cookie', cookies)
        .expect(201)

      expect(createResponse.body.closed).toBe(false)

      const closeResponse = await api
        .post('/daily-sale/close')
        .set('Cookie', cookies)
        .expect(200)

      expect(closeResponse.body.closed).toBe(true)
    })
  })

  describe('Exception paths', () => {
    it('Should not create a new daily saly if it was already created at the same day', async () => {
      await api.post('/daily-sale/create').set('Cookie', cookies).expect(201)
      await api.post('/daily-sale/create').set('Cookie', cookies).expect(409)
    })

    it('Should throw an error if a "close" request is sent before creating a daily sale', async () => {
      await api.post('/daily-sale/close').set('Cookie', cookies).expect(400)
    })

    it('Should throw an error if you try to close an already closed daily sale', async () => {
      await api.post('/daily-sale/create').set('Cookie', cookies).expect(201)
      await api.post('/daily-sale/close').set('Cookie', cookies).expect(200)
      await api.post('/daily-sale/close').set('Cookie', cookies).expect(400)
    })
  })
})
