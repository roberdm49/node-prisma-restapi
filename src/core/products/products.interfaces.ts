import { RequestHandler } from 'express'
import {
  ProductsModelCreate,
  ProductsModelDelete,
  ProductsModelGetAll,
  ProductsModelUpdateMany,
  ProductsServiceCreate,
  ProductsServiceDelete,
  ProductsServiceGetAll,
  ProductsServiceUpdateMany
} from './products.types'

export interface IProductModel {
  create: ProductsModelCreate
  getAll: ProductsModelGetAll
  updateMany: ProductsModelUpdateMany
  deleteMany: ProductsModelDelete
}

export interface IProductService {
  create: ProductsServiceCreate
  getAll: ProductsServiceGetAll
  updateMany: ProductsServiceUpdateMany
  deleteMany: ProductsServiceDelete
}

export interface IProductController {
  create: RequestHandler
  getAll: RequestHandler
  updateMany: RequestHandler
  deleteMany: RequestHandler
}
