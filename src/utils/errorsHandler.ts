import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Response } from 'express'
import { ZodError } from 'zod'
import { MissingCredentialsError, UnauthorizedError, WrongCredentialsError } from '@/errors'
import { HttpStatus } from '@/enums/httpStatus'
import chalk from 'chalk'

const UNIQUE_CONSTRAINT_ERROR_CODE = 'P2002'

type ErrorCheck<T extends Error> = (error: T, response: Response) => Response
type ErrorConstructor = new (...args: any[]) => Error

const handleMissingCredentialsError: ErrorCheck<MissingCredentialsError> = (error, response) => {
  console.log(chalk.magenta('Handling "MissingCredentialsError"'))
  console.log(error)

  return response.status(HttpStatus.BadRequest).json({
    message: error.message,
    missingCredentials: error.missingCredentials
  })
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

const handlePrismaClientKnownRequestError: ErrorCheck<PrismaClientKnownRequestError> = (error, response) => {
  console.log(chalk.magenta('Handling "PrismaClientKnownRequestError"'))
  console.log(error)

  if (error.code === UNIQUE_CONSTRAINT_ERROR_CODE) {
    return response.status(HttpStatus.BadGateway).json({
      error: 'Datos ya existentes',
      fields: error.meta?.target
    })
  }

  return response.status(HttpStatus.InternalServerError).json({ error: 'Internal server error' })
}

const handleZodError: ErrorCheck<ZodError> = (_error, response) => {
  console.log(chalk.magenta('Handling "ZodError"'))
  console.log(_error)

  return response.status(HttpStatus.BadRequest).json({ error: 'Solicitud incorrecta' })
}

export const handleDefaultError: ErrorCheck<Error> = (_error, response) => {
  console.log(chalk.magenta('Handling "DefaultError"'))
  console.log(_error)

  return response.status(HttpStatus.InternalServerError).json({ error: 'Internal server error' })
}

export const errorHandlers: Array<[ErrorConstructor, ErrorCheck<any>]> = [
  [MissingCredentialsError, handleMissingCredentialsError],
  [WrongCredentialsError, handleWrongCredentialsError],
  [UnauthorizedError, handleUnauthorizedError],
  [PrismaClientKnownRequestError, handlePrismaClientKnownRequestError],
  [ZodError, handleZodError]
]
