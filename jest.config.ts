import dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts', // Archivos que quieres incluir en el reporte de cobertura
    '!src/**/*.spec.ts', // Archivos de pruebas que no quieres incluir en el reporte de cobertura
    '!src/**/*.test.ts' // Archivos de pruebas que no quieres incluir en el reporte de cobertura
  ]
}
