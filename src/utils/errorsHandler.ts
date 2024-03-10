import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { Response } from 'express'
import chalk from 'chalk'
import { ZodError } from 'zod'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { BadRequestError, ConflictError, RefreshTokenError, UnauthorizedError, WrongCredentialsError } from '@/errors'
import { HttpStatus } from '@/enums/httpStatus'

const UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002'
const FK_CONSTRAINT_ERROR_CODE = 'P2003'

type ErrorCheck<T extends Error> = (error: T, response: Response) => Response
type ErrorConstructor = new (...args: any[]) => Error

const handleBadRequestError: ErrorCheck<BadRequestError> = (error, response) => {
  console.log(chalk.magenta('Handling "BadRequestError"'))
  console.log(error)

  return response.status(HttpStatus.BadRequest).json({ message: error.message })
}

const handleWrongCredentialsError: ErrorCheck<WrongCredentialsError> = (error, response) => {
  console.log(chalk.magenta('Handling "WrongCredentialsError"'))
  console.log(error)

  return response.status(HttpStatus.BadRequest).json({ message: error.message })
}

const handleUnauthorizedError: ErrorCheck<UnauthorizedError> = (error, response) => {
  console.log(chalk.magenta('Handling "UnauthorizedError"'))
  console.log(error)

  return response.status(HttpStatus.Unauthorized).json({ message: error.message })
}

const handleConflictError: ErrorCheck<ConflictError> = (error, response) => {
  console.log(chalk.magenta('Handling "ConflictError"'))
  console.log(error)

  return response.status(HttpStatus.Conflict).json({ message: error.message })
}

const handleRefreshTokenError: ErrorCheck<RefreshTokenError> = (error, response) => {
  console.log(chalk.magenta('Handling "RefreshTokenError"'))
  console.log(error)

  return response.status(HttpStatus.Unauthorized).json({ message: error.message })
}

const handlePrismaClientKnownRequestError: ErrorCheck<PrismaClientKnownRequestError> = (error, response) => {
  console.log(chalk.magenta('Handling "PrismaClientKnownRequestError"'))
  console.log(error)

  if (error.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
    return response.status(HttpStatus.BadRequest).json({
      error: 'Datos ya existentes',
      fields: error.meta?.target
    })
  }

  if (error.code === FK_CONSTRAINT_ERROR_CODE) {
    return response.status(HttpStatus.BadRequest).json({ error: 'Solicitud malformada' })
  }

  return response.status(HttpStatus.InternalServerError).json({ error: 'Internal server error' })
}

const handlePrismaClientValidationError: ErrorCheck<PrismaClientValidationError> = (error, response) => {
  console.log(chalk.magenta('Handling "PrismaClientValidationError"'))
  console.log(error)

  return response.status(HttpStatus.BadRequest).json({ error: 'Datos faltantes' })
}

const handleZodError: ErrorCheck<ZodError> = (_error, response) => {
  console.log(chalk.magenta('Handling "ZodError"'))
  console.log(_error)

  return response.status(HttpStatus.BadRequest).json({ error: 'Solicitud incorrecta' })
}

export const handleTokenExpiredError: ErrorCheck<TokenExpiredError> = (_error, response) => {
  console.log(chalk.magenta('Handling "TokenExpiredError"'))
  console.log(_error)

  return response.status(HttpStatus.Unauthorized).json({ error: 'Token expirado' })
}

export const handleJsonWebTokenError: ErrorCheck<JsonWebTokenError> = (_error, response) => {
  console.log(chalk.magenta('Handling "JsonWebTokenError"'))
  console.log(_error)

  return response.status(HttpStatus.Unauthorized).json({ error: 'Token expirado' })
}

export const handleSyntaxError: ErrorCheck<SyntaxError> = (_error, response) => {
  console.log(chalk.magenta('Handling "SyntaxError"'))
  console.log(_error)

  return response.status(HttpStatus.BadRequest).json({ error: 'Solicitud malformada' })
}

export const handleDefaultError: ErrorCheck<Error> = (_error, response) => {
  console.log(chalk.magenta('Handling "DefaultError"'))
  console.log(_error)
  console.log(_error.name)

  return response.status(HttpStatus.InternalServerError).json({ error: 'Internal server error' })
}

export const errorHandlers: Array<[ErrorConstructor, ErrorCheck<any>]> = [
  [BadRequestError, handleBadRequestError],
  [WrongCredentialsError, handleWrongCredentialsError],
  [UnauthorizedError, handleUnauthorizedError],
  [ConflictError, handleConflictError],
  [RefreshTokenError, handleRefreshTokenError],
  [PrismaClientKnownRequestError, handlePrismaClientKnownRequestError],
  [PrismaClientValidationError, handlePrismaClientValidationError],
  [TokenExpiredError, handleTokenExpiredError],
  [JsonWebTokenError, handleJsonWebTokenError],
  [SyntaxError, handleSyntaxError],
  [ZodError, handleZodError]
]
