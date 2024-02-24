import { RequestHandler } from 'express'
import {
  ProductsModelCreateMany,
  ProductsModelDelete,
  ProductsModelGetAll,
  ProductsModelGetManyById,
  ProductsModelGetOneById,
  ProductsModelUpdateMany,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceGetOneById,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductModel {
  createMany: ProductsModelCreateMany
  getAll: ProductsModelGetAll
  updateMany: ProductsModelUpdateMany
  deleteMany: ProductsModelDelete
  getManyById: ProductsModelGetManyById
  getOneById: ProductsModelGetOneById
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
