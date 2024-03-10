// @ts-check

import supertest from 'supertest'
import bcrypt from 'bcrypt'
import { createApp } from '@/app'
import { GlobalEnv } from '@/utils/constants'

const app = createApp()
const api = supertest(app)

describe('Currency', () => {
  const cookies: string[] = []

  beforeEach(async () => {
    const nonHashedPassword = 'password123'
    const hashedPassword = await bcrypt.hash(nonHashedPassword, GlobalEnv.HASH_ROUNDS)
    const payload = {
      id: '1',
      username: 'johndoe123',
      password: hashedPassword,
      firstname: 'john',
      lastname: 'doe',
      createdAt: new Date(),
      tenantId: '123'
    }

    jest.mock('@/core/users/users.repository.ts', () => {
      return jest.fn().mockImplementation(() => {
        return {
          logIn: jest.fn().mockResolvedValue(payload)
        }
      })
    })

    const res = api
      .post('/auth/log-in')
      .send({ username: payload.username, password: payload.password })

    console.log(res.app)
  })

  test('Should retrieve all the currencies', async () => {
    await api
      .get('/currency/get')
      .expect(405)
  })
})
