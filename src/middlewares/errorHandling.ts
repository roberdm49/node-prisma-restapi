import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'

export const errorHandlerMiddleware = (
  _error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  console.log(chalk.bold.underline.magenta('Executing error handler middleware'))
  console.log(`${chalk.bold('Error name:')} ${chalk.green(_error.name)}`)
  console.log(`${chalk.bold('Error message:')} ${chalk.green(_error.message)}`)
  console.log(chalk.bold('Error stack:'), chalk.greenBright(_error.stack))

  if (_error instanceof PrismaClientKnownRequestError) {
    return response.status(500).json({ error: 'Internal server error' })
  }

  /*
  if (_error instanceof CustomAppError) {
    return response.status(400).json({ error: _error.message })
  }
  */

  return response.status(500).json({ error: 'Internal server error' })
}
