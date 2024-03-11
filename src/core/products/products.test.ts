import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Products', () => {
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

  })

  describe('Exception paths', () => {

  })
})
