import { RequestHandler } from 'express'
import {
  ProductsRepositoryCreateMany,
  ProductsRepositoryDelete,
  ProductsRepositoryGetAll,
  ProductsRepositoryGetManyById,
  ProductsRepositoryGetOneById,
  ProductsRepositoryUpdateMany,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceGetOneById,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductRepository {
  createMany: ProductsRepositoryCreateMany
  getAll: ProductsRepositoryGetAll
  updateMany: ProductsRepositoryUpdateMany
  deleteMany: ProductsRepositoryDelete
  getManyById: ProductsRepositoryGetManyById
  getOneById: ProductsRepositoryGetOneById
}

export interface IProductService {
  createMany: ProductsServiceCreateMany
  getAll: ProductsServiceGetAll
  updateMany: ProductsServiceUpdateMany
  deleteMany: ProductsServiceDelete
  getManyById: ProductsServiceGetManyById
  everyProductBelongToSameTenant: ProductsServiceEveryProductBelongToSameTenant
  getOneById: ProductsServiceGetOneById
}

export interface IProductController {
  create: RequestHandler
  getAll: RequestHandler
  updateMany: RequestHandler
  deleteMany: RequestHandler
}
