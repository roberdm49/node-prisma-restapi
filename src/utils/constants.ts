import dotenv from 'dotenv'
dotenv.config()

export const GlobalEnv = {
  NODE_ENV: String(process.env.NODE_ENV),
  APP_PORT: Number(process.env.APP_PORT),
  ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
  REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET)
} as const
