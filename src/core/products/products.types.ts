import { Router } from 'express'
import { IProductModel, IProductService } from './products.interfaces'

export type ProductsModelCreateMany = (productsDataWithTenantId: ProductWithoutId[]) => Promise<number>
export type ProductsModelGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsModelUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsModelDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsModelGetManyById = (productIds: string[]) => Promise<Product[]>
export type ProductsModelGetOneById = (productId: string) => Promise<Product | null>

export type ProductsServiceCreateMany = (tenantId: string, productsData: ProductEntry[]) => Promise<number>
export type ProductsServiceGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsServiceUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsServiceDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsServiceGetManyById = (productIds: string[]) => Promise<Product[]>
export type ProductsServiceEveryProductBelongToSameTenant = (tenantId: string, productIds: string[]) => Promise<boolean>
export type ProductsServiceGetOneById = (productId: string) => Promise<Product | null>

export type ProductsCreateRoutes = ({ productsModel }: { productsModel: IProductModel }) => Router

export type ProductServiceConstructor = {
  productsModel: IProductModel
}

export type ProductControllerConstructor = {
  productsService: IProductService
}

// "DO NOT REMOVE "| null"! Since Prisma returns null when a property does not exist,
// it is necessary to type explicitly "| null" instead of "?", because
// this character means 'undefined' in TypeScript
export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  stock: number | null
  barCode: string | null
  tenantId: string
  companyId: string | null
  currencyId: number
  latestHistoryProduct: string
}

export type ProductEntry = Omit<Product, 'id' | 'tenantId' >

export type ProductWithoutId = Omit<Product, 'id'>

export type ProductHistory = Product & {
  productId: string
}

export type ProductHistoryEntry = Omit<ProductHistory, 'id' | 'productId'>
