import cookie from 'cookie'

export const createSecureCookie = (key: string, value: string, maxAgeInSeconds?: number): string => {
  const DEFAULT_MAX_AGE = 60 * 60 * 24 // A day

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeInSeconds ?? DEFAULT_MAX_AGE
  }

  const setCookie = cookie.serialize(key, value, cookieOptions)

  return setCookie
}
