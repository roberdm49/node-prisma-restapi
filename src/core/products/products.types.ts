import { IProduct } from './products.interfaces'

export type TProductsModelCreate = (productsData: IProduct[]) => Promise<number>
export type TProductsModelGetAll = () => Promise<IProduct[]>

export type TProductsServiceCreate = (productsData: IProduct[]) => Promise<number>
export type TProductsServiceGetAll = () => Promise<IProduct[]>
