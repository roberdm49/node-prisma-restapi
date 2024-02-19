import { RequestHandler } from 'express'
import {
  ProductsModelCreateMany,
  ProductsModelDelete,
  ProductsModelGetAll,
  ProductsModelGetManyById,
  ProductsModelUpdateMany,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductModel {
  createMany: ProductsModelCreateMany
  getAll: ProductsModelGetAll
  updateMany: ProductsModelUpdateMany
  deleteMany: ProductsModelDelete
  getManyById: ProductsModelGetManyById
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
