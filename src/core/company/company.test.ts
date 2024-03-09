import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
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

  const tenantInformation2 = {
    tenantName: 'tenant2',
    username: 'username2',
    firstname: 'firstname2',
    lastname: 'lastname2',
    password: 'password2'
  }

  let cookies1: string[] = []
  let cookies2: string[] = []

  beforeEach(async () => {
    await cleanUpAll()

    await api
      .post('/auth/sign-up')
      .send({ ...tenantInformation1 })

    await api
      .post('/auth/sign-up')
      .send({ ...tenantInformation2 })

    const loginResponse1 = await api
      .post('/auth/log-in')
      .send({
        username: tenantInformation1.username,
        password: tenantInformation1.password
      })

    const loginResponse2 = await api
      .post('/auth/log-in')
      .send({
        username: tenantInformation2.username,
        password: tenantInformation2.password
      })

    cookies1 = JSON.parse(JSON.stringify(loginResponse1.headers['set-cookie']))
    cookies2 = JSON.parse(JSON.stringify(loginResponse2.headers['set-cookie']))

    await api
      .post('/company/create')
      .send(mockCompany)
      .set('Cookie', cookies1)

    await api
      .post('/company/create')
      .send(mockCompany)
      .set('Cookie', cookies2)
  })

  test('Should not have access to the endpoints without credentials', async () => {
    await api.get('/company/get').expect(401)
    await api.post('/company/create').send(mockCompany).expect(401)
  })

  test('Should retrieve all corresponding companies', async () => {
    const response = await api
      .get('/company/get')
      .set('Cookie', cookies1)
      .expect(200)

    expect(response.body).toHaveLength(1)
  })

  test('Should not pass a malformed "create" request', async () => {
    await api
      .post('/company/create')
      .send({ name: 'Mock', script: 'some code' })
      .set('Cookie', cookies1)
      .expect(400)
  })
})
