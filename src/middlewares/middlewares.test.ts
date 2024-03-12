import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Middlewares', () => {
  const tenantInformation = {
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
      .send({ ...tenantInformation })

    const loginResponse1 = await api
      .post('/auth/log-in')
      .send({
        username: tenantInformation.username,
        password: tenantInformation.password
      })

    cookies = JSON.parse(JSON.stringify(loginResponse1.headers['set-cookie']))
  })

  it('Should not have access to the endpoints without credentials', async () => {
    await api.get('/company/get').expect(401)
    await api.post('/company/create').send({ name: 'Mock' }).expect(401)
  })

  it('Should throw an error if the route do not exists', async () => {
    await api
      .get('/products/unexisting-route')
      .set('Cookie', cookies)
      .expect(404)
  })
})
