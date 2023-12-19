import { RequestHandler } from '@/types/RequestHandler'
import { TProductsModelCreate, TProductsModelGetAll, TProductsServiceCreate, TProductsServiceGetAll } from './products.types'

export interface IProductModel {
  create: TProductsModelCreate
  getAll: TProductsModelGetAll
}

export interface IProductService {
  createProducts: TProductsServiceCreate
  getProducts: TProductsServiceGetAll
}

export interface IProductController {
  createProducts: RequestHandler
  getProducts: RequestHandler
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
