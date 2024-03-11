import { Router } from 'express'
import { IProductRepository, IProductService } from './products.interfaces'

export type ProductsRepositoryCreateMany = (productsDataWithTenantId: ProductWithoutId[]) => Promise<ProductWithHistoryMetadataArray[]>
export type ProductsRepositoryGetAll = (tenantId: string) => Promise<ProductWithHistoryMetadataArray[]>
export type ProductsRepositoryUpdateMany = (tenantId: string, products: Product[]) => Promise<ProductWithHistoryMetadataArray[]>
export type ProductsRepositoryDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsRepositoryGetManyById = (productIds: string[]) => Promise<ProductWithHistoryMetadataArray[]>
export type ProductsRepositoryGetOneById = (productId: string) => Promise<ProductWithHistoryMetadataArray | null>

export type ProductsServiceCreateMany = (tenantId: string, productsData: ProductEntryWithNull[]) => Promise<ProductWithSingleHistoryMetadata[]>
export type ProductsServiceGetAll = (tenantId: string) => Promise<ProductWithSingleHistoryMetadata[]>
export type ProductsServiceUpdateMany = (tenantId: string, products: ProductUpdate[]) => Promise<ProductWithSingleHistoryMetadata[]>
export type ProductsServiceDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsServiceGetManyById = (productIds: string[]) => Promise<ProductWithSingleHistoryMetadata[]>
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
}

export type ProductWithSingleHistoryMetadata = Product & {
  latestProductHistory: ProductHistoryMetadata | null
}

export type ProductWithHistoryMetadataArray = Product & {
  productsHistory: ProductHistoryMetadata[]
}

export type ProductEntryWithNull = Omit<Product, 'id' | 'tenantId'>
export type ProductEntryWithUndefined = Omit<ProductEntryWithNull, 'description' | 'stock' | 'barCode' | 'companyId'> & {
  description?: string
  stock?: number
  barCode?: string
  companyId?: string
}

export type ProductWithoutId = Omit<Product, 'id'>

export type ProductHistory = Product & {
  productId: string
}

export type ProductHistoryEntry = Omit<ProductHistory, 'id' | 'productId'>

export type ProductWithQuantity = Product & {
  quantity: number
}

export type ProductHistoryMetadata = {
  id: string
  modificationTimestamp: Date
}

export type ProductUpdate = {
  id: string
  name?: string
  price?: number
  currencyId?: number
  description?: string
  stock?: number
  barCode?: string
  companyId?: string
}
