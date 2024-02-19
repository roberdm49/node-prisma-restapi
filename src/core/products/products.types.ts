import { Router } from 'express'
import { IProductModel, IProductService } from './products.interfaces'

export type ProductsModelCreateMany = (productsDataWithTenantId: ProductWithoutId[]) => Promise<number>
export type ProductsModelGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsModelUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsModelDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsModelGetManyById = (productIds: string[]) => Promise<Product[]>

export type ProductsServiceCreateMany = (tenantId: string, productsData: Product[]) => Promise<number>
export type ProductsServiceGetAll = (tenantId: string) => Promise<Product[]>
export type ProductsServiceUpdateMany = (tenantId: string, products: Product[]) => Promise<Product[]>
export type ProductsServiceDelete = (tenantId: string, ids: string[]) => Promise<Product[]>
export type ProductsServiceGetManyById = (productIds: string[]) => Promise<Product[]>
export type ProductsServiceEveryProductBelongToSameTenant = (tenantId: string, productIds: string[]) => Promise<boolean>

export type ProductsCreateRoutes = ({ productsModel }: { productsModel: IProductModel }) => Router

export type ProductServiceConstructor = {
  productsModel: IProductModel
}

export type ProductControllerConstructor = {
  productsService: IProductService
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number | null
  barCode: string | null
  tenantId: string
  companyId: string | null
  currencyId: string
}

export type ProductEntry = Omit<Product, 'id' | 'currencyId' | 'tenantId' >

export type ProductWithoutId = Omit<Product, 'id'>

export type ProductHistory = Product & {
  productId: string
}

export type ProductHistoryEntry = Omit<ProductHistory, 'id' | 'productId'>
