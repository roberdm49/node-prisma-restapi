import { Router } from 'express'
import { IProductModel, IProductService } from './products.interfaces'

export type ProductsModelCreate = (productsData: Product[]) => Promise<number>
export type ProductsModelGetAll = () => Promise<Product[]>
export type ProductsModelUpdateMany = (products: Product[]) => Promise<Product[]>
export type ProductsModelDelete = (ids: string[]) => Promise<Product[]>

export type ProductsServiceCreate = (productsData: Product[]) => Promise<number>
export type ProductsServiceGetAll = () => Promise<Product[]>
export type ProductsServiceUpdateMany = (products: Product[]) => Promise<Product[]>
export type ProductsServiceDelete = (ids: string[]) => Promise<Product[]>

export type ProductsCreateRoutes = ({ productsModel }: { productsModel: IProductModel }) => Router

export type ProductServiceConstructor = {
  productsModel: IProductModel
}

export type ProductControllerConstructor = {
  productsService: IProductService
}

// TODO: issues related with null vs undefined (the id is optional but it doesn't have the null option, because ts throw a warning)
export type Product = {
  id?: string
  name: string
  price: number
  stock?: number | null
  barCode?: string | null
  tenantId: string
  companyId?: string | null
  currencyId: string
}
