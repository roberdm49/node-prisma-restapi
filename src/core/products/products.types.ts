import { IProduct } from './products.interfaces'

export type TProductsModelCreate = (productsData: IProduct[]) => Promise<number>
export type TProductsModelGetAll = () => Promise<IProduct[]>
export type TProductsModelUpdateMany = (products: IProduct[]) => Promise<IProduct[]>
export type TProductsModelDelete = (ids: string[]) => Promise<IProduct[]>

export type TProductsServiceCreate = (productsData: IProduct[]) => Promise<number>
export type TProductsServiceGetAll = () => Promise<IProduct[]>
export type TProductsServiceUpdateMany = (products: IProduct[]) => Promise<IProduct[]>
export type TProductsServiceDelete = (ids: string[]) => Promise<IProduct[]>
