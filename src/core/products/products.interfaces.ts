import { RequestHandler } from 'express'
import {
  ProductsRepositoryCreateMany,
  ProductsRepositoryDelete,
  ProductsRepositoryGetAll,
  ProductsRepositoryGetManyById,
  ProductsRepositoryUpdateMany,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductRepository {
  createMany: ProductsRepositoryCreateMany
  getAll: ProductsRepositoryGetAll
  updateMany: ProductsRepositoryUpdateMany
  deleteMany: ProductsRepositoryDelete
  getManyById: ProductsRepositoryGetManyById
}

export interface IProductService {
  createMany: ProductsServiceCreateMany
  getAll: ProductsServiceGetAll
  updateMany: ProductsServiceUpdateMany
  deleteMany: ProductsServiceDelete
  getManyById: ProductsServiceGetManyById
  everyProductBelongToSameTenant: ProductsServiceEveryProductBelongToSameTenant
}

export interface IProductController {
  create: RequestHandler
  getAll: RequestHandler
  updateMany: RequestHandler
  deleteMany: RequestHandler
}
