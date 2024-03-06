import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

export const zodSchemaValidationMiddleware = (schema: AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params
      })
      return next()
    } catch (error) {
      next(error)
    }
  }
