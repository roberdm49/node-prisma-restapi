import { NextFunction, Request, Response } from 'express'
import chalk from 'chalk'

export const routeNotFoundMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
): any => {
  console.log(chalk.white.bold.underline('Executing route not found middleware'))
  return response.status(404).send('Resource not found')
}
