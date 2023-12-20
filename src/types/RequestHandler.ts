import { Request, Response, NextFunction } from 'express'

export type TRequestHandler = (request: Request, response: Response, next: NextFunction) => void
