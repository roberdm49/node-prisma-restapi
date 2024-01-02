import { ErrorNames } from '@/enums/errors'

export class MissingCredentialsError extends Error {
  readonly missingCredentials: string[]

  constructor (message: string, missingCredentials: string[]) {
    super(message)
    this.name = ErrorNames.MissingCredentials
    this.missingCredentials = missingCredentials
  }
}
