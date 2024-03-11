import { Router } from 'express'
import { IProductRepository, IProductService } from './products.interfaces'

export type ProductsRepositoryCreateMany = (productsDataWithTenantId: ProductWithoutId[]) => Promise<number>
export type ProductsRepositoryGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsRepositoryUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsRepositoryDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsRepositoryGetManyById = (productIds: string[]) => Promise<Product[]>
export type ProductsRepositoryGetOneById = (productId: string) => Promise<Product | null>

export type ProductsServiceCreateMany = (tenantId: string, productsData: ProductEntry[]) => Promise<number>
export type ProductsServiceGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsServiceUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsServiceDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsServiceGetManyById = (productIds: string[]) => Promise<Product[]>
export type ProductsServiceEveryProductBelongToSameTenant = (tenantId: string, productIds: string[]) => Promise<boolean>
export type ProductsServiceGetOneById = (productId: string) => Promise<Product | null>

export type ProductsCreateRoutes = ({ productsRepository }: { productsRepository: IProductRepository }) => Router

export type ProductServiceConstructor = {
  productsRepository: IProductRepository
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
  price: number
  tenantId: string
  currencyId: number
  description: string | null
  stock: number | null
  barCode: string | null
  companyId: string | null
  latestProductHistoryId: string | null
}

export type ProductEntry = Omit<Product, 'id' | 'tenantId' | 'latestProductHistoryId'>

export type ProductWithoutId = Omit<Product, 'id' | 'latestProductHistoryId'>

export type ProductHistory = Product & {
  productId: string
}

export type ProductHistoryEntry = Omit<ProductHistory, 'id' | 'productId'>

export type ProductWithQuantity = Product & {
  quantity: number
}

export type ProductUpdate = {
  id: string
  name: string | null
  price: number | null
  currencyId: number | null
  description: string | null
  stock: number | null
  barCode: string | null
  companyId: string | null
}
