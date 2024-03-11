import supertest from 'supertest'
import { createApp } from '@/app'
import { cleanUpAll } from '@/utils/testing'

const app = createApp()
const api = supertest(app)

describe('Auth', () => {
  const information = { tenantName: 'My tenant', username: 'Username', password: 'password123', firstname: 'Jonh', lastname: 'Doe' }

  beforeEach(async () => {
    await cleanUpAll()
  })

  describe('Happy paths', () => {
    it('Should create an account with a properly request', async () => {
      await api
        .post('/auth/sign-up')
        .send(information)
        .expect(201)
    })

    it('Should be logged correctly', async () => {
      await api
        .post('/auth/sign-up')
        .send(information)
        .expect(201)

      await api
        .post('/auth/log-in')
        .send({ username: information.username, password: information.password })
        .expect(202)
    })

    it('Should refresh both tokens', async () => {
      await api
        .post('/auth/sign-up')
        .send(information)
        .expect(201)

      const response = await api
        .post('/auth/log-in')
        .send({ username: information.username, password: information.password })
        .expect(202)

      const cookies: string[] = JSON.parse(JSON.stringify(response.headers['set-cookie']))

      const refreshTokenResponse = await api
        .get('/auth/refresh-token')
        .set('Cookie', cookies)
        .expect(200)

      const refreshTokenCookies: string[] = JSON.parse(JSON.stringify(refreshTokenResponse.headers['set-cookie']))

      expect(refreshTokenCookies).toHaveLength(2)
    })
  })

  describe('Exception paths', () => {
    it('Should not create an account with a malformed request', async () => {
      const information = { tenantName: 'My tenant', username: 'Username', password: 'password123', firstname: 'Jonh', lastname: 'Doe' }
      await api.post('/auth/sign-up').send({ ...information, password: 123 }).expect(400)
      await api.post('/auth/sign-up').send({ ...information, tenantName: true }).expect(400)
      await api.post('/auth/sign-up').send({ ...information, extraField: 'extra-data' }).expect(400)
      await api.post('/auth/sign-up').send({ tenantName: 'My tenant', username: 'Username', password: 'password123', lastname: 'Doe' }).expect(400)
    })

    it('Should fail at log in', async () => {
      await api
        .post('/auth/sign-up')
        .send(information)
        .expect(201)

      await api.post('/auth/log-in').send({ username: information.username, password: 'incorrectpassword' }).expect(400)
      await api.post('/auth/log-in').send({ username: 'unexistinguser', password: information.password }).expect(400)
      await api.post('/auth/log-in').send({ username: information.username }).expect(400)
      await api.post('/auth/log-in').send({ username: information.username, password: information.password, token: 'example' }).expect(400)
    })

    it('Should reject the refresh token request if the token is missing', async () => {
      await api
        .post('/auth/sign-up')
        .send(information)
        .expect(201)

      await api
        .post('/auth/log-in')
        .send({ username: information.username, password: information.password })
        .expect(202)

      await api
        .get('/auth/refresh-token')
        .expect(401)
    })
  })
})
