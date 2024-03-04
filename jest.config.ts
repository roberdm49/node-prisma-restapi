import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
