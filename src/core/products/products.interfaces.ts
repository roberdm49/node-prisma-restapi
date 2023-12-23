import { RequestHandler } from 'express'
import {
  TProductsModelCreate,
  TProductsModelDelete,
  TProductsModelGetAll,
  TProductsModelUpdateMany,
  TProductsServiceCreate,
  TProductsServiceDelete,
  TProductsServiceGetAll,
  TProductsServiceUpdateMany
} from './products.types'

export interface IProductModel {
  create: TProductsModelCreate
  getAll: TProductsModelGetAll
  updateMany: TProductsModelUpdateMany
  deleteMany: TProductsModelDelete
}

export interface IProductService {
  create: TProductsServiceCreate
  getAll: TProductsServiceGetAll
  updateMany: TProductsServiceUpdateMany
  deleteMany: TProductsServiceDelete
}

export interface IProductServiceConstructor {
  productsModel: IProductModel
}

export interface IProductController {
  create: RequestHandler
  getAll: RequestHandler
  updateMany: RequestHandler
  deleteMany: RequestHandler
}

export interface IProductControllerConstructor {
  productsService: IProductService
}

// TODO: issues related with null vs undefined (the id is optional but it doesn't have the null option, because ts throw a warning)
export interface IProduct {
  id?: string
  name: string
  price: number
  stock?: number | null
  barCode?: string | null
  tenantId: string
  companyId?: string | null
  currencyId: string
}
