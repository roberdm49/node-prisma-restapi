import { ErrorNames } from '@/enums/errors'

export class ConflictError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorNames.Conflict
  }
}
