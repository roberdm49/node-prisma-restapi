import { TRequestHandler } from '@/types/TRequestHandler'
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

export interface IProductController {
  create: TRequestHandler
  getAll: TRequestHandler
  updateMany: TRequestHandler
  deleteMany: TRequestHandler
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
