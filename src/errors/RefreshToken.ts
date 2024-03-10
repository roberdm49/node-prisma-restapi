import { ErrorNames } from '@/enums/errors'

export class RefreshTokenError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorNames.RefreshToken
  }
}
