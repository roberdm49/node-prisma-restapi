import cookie from 'cookie'

export const createSecureCookie = (cookieName: string, cookieValue: string, maxAgeInSeconds?: number): string => {
  const DEFAULT_MAX_AGE = 60 * 60 * 24 // A day (the value is in seconds)

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeInSeconds ?? DEFAULT_MAX_AGE
  }

  const setCookie = cookie.serialize(cookieName, cookieValue, cookieOptions)

  return setCookie
}
