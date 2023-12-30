import { ErrorNames } from '@/enums/errors'

export class UnauthorizedError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorNames.Unauthorized
  }
}
