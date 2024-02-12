import { RequestHandler } from 'express'
import {
  ProductsModelCreate,
  ProductsModelDelete,
  ProductsModelGetAll,
  ProductsModelGetManyById,
  ProductsModelUpdateMany,
  ProductsServiceCreate,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductModel {
  create: ProductsModelCreate
  getAll: ProductsModelGetAll
  updateMany: ProductsModelUpdateMany
  deleteMany: ProductsModelDelete
  getManyById: ProductsModelGetManyById
}

export interface IProductService {
  create: ProductsServiceCreate
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
