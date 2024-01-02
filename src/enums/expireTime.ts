// Jwt uses a better semantic syntax; but optionally you can use an integer
// to indicate seconds or a string with this syntax or plain numbers as string, and these
// would be taken as milliseconds

// Cookies (from cookie-parser) use the expire time in milliseconds

export enum JwtExpireTime {
  AccessToken = '30m',
  RefreshToken = '2h'
}

export enum CookieExpireTime {
  AccessToken = 1000 * 60 * 30,
  RefreshToken = 1000 * 60 * 120
}
