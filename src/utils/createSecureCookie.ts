import cookie from 'cookie'
import { GlobalEnv } from '@/utils/constants'

export const createSecureCookie = (cookieName: string, cookieValue: string, maxAgeInSeconds: number): string => {
  const cookieOptions = {
    httpOnly: true,
    secure: GlobalEnv.APP_RUNTIME_ENV === 'production',
    maxAge: maxAgeInSeconds,
    path: '/'
  }

  const setCookie = cookie.serialize(cookieName, cookieValue, cookieOptions)

  return setCookie
}
