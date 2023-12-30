import { ErrorNames } from '@/enums/errors'

export class WrongCredentialsError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorNames.WrongCredentials
  }
}
