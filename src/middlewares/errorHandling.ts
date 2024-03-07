import { Request, Response, NextFunction } from 'express'
import chalk from 'chalk'
import { errorHandlers, handleDefaultError } from '@/utils/errorsHandler'

export const errorHandlerMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  console.log(chalk.bold.underline.magenta('Executing error handler middleware'))

  for (const errorHandlerEntry of errorHandlers) {
    const [errorInstance, errorHandler] = errorHandlerEntry
    if (error instanceof errorInstance) {
      return errorHandler(error, response)
    }
  }

  return handleDefaultError(error, response)
}
