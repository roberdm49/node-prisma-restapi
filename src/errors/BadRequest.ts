import { ErrorNames } from '@/enums/errors'

export class BadRequestError extends Error {
  constructor (message: string) {
    super(message)
    this.name = ErrorNames.BadRequest
  }
}
