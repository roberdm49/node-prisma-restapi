import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'
import { WrongCredentialsError } from '@/errors/WrongCredentials'
import { MissingCredentialsError } from '@/errors/MissingCredentials'
import { UnauthorizedError } from '@/errors/Unauthorized'
import { HttpStatus } from '@/enums/httpStatus'
import { ErrorClientMessages } from '@/enums/errors'

export const errorHandlerMiddleware = (
  _error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  console.log(chalk.bold.underline.magenta('Executing error handler middleware'))
  console.log(_error)

  if (_error instanceof MissingCredentialsError) {
    return response.status(HttpStatus.BadRequest).json({
      message: ErrorClientMessages.MissingCredentials,
      missingCredentials: _error.missingCredentials
    })
  }

  if (_error instanceof WrongCredentialsError) {
    return response.status(HttpStatus.BadRequest).json({ message: ErrorClientMessages.WrongCredentials })
  }

  if (_error instanceof UnauthorizedError) {
    return response.status(HttpStatus.Unauthorized)
  }

  if (_error instanceof PrismaClientKnownRequestError) {
    return response.status(500).json({ error: 'Internal server error' })
  }

  return response.status(500).json({ error: 'Internal server error' })
}
