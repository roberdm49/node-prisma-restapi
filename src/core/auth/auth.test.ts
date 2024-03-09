import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Auth', () => {
  beforeEach(async () => {
    await cleanUpAll()
  })

  test('Should create an account with a properly request', async () => {
    const information = { tenantName: 'My tenant', username: 'Username', password: 'password123', firstname: 'Jonh', lastname: 'Doe' }
    await api
      .post('/auth/sign-up')
      .send(information)
      .expect(201)
  })

  test('Should not create an account with a malformed request', async () => {
    const information = { tenantName: 'My tenant', username: 'Username', password: 123456, firstname: 'Jonh', lastname: 'Doe' }
    await api
      .post('/auth/sign-up')
      .send(information)
      .expect(201)
  })
})
