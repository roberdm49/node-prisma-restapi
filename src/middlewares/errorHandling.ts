import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'
import { MissingCredentialsError, UnauthorizedError, WrongCredentialsError } from '@/errors'
import { HttpStatus } from '@/enums/httpStatus'

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
      message: _error.message,
      missingCredentials: _error.missingCredentials
    })
  }

  if (_error instanceof WrongCredentialsError) {
    return response.status(HttpStatus.BadRequest).json({ message: _error.message })
  }

  if (_error instanceof UnauthorizedError) {
    return response.status(HttpStatus.Unauthorized).json({ message: _error.message })
  }

  if (_error instanceof PrismaClientKnownRequestError) {
    return response.status(500).json({ error: 'Internal server error' })
  }

  return response.status(500).json({ error: 'Internal server error' })
}
