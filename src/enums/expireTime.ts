// Jwt uses a better semantic syntax; but optionally you can use an integer
// to indicate seconds or a string with this syntax or plain numbers as string, and these
// would be taken as milliseconds

// Cookies use the expire time in seconds

export enum JwtExpireTime {
  AccessToken = '30m',
  RefreshToken = '2h'
}

export enum CookieExpireTime {
  AccessToken = 60 * 30,
  RefreshToken = 60 * 120
}
