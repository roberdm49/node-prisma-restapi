import { IProductModel, IProductService } from './products.interfaces'
import {
  ProductServiceConstructor,
  ProductsServiceCreate,
  ProductsServiceDelete,
  ProductsServiceGetAll,
  ProductsServiceUpdateMany
} from './products.types'

export default class ProductsService implements IProductService {
  private readonly productsModel: IProductModel

  constructor ({ productsModel }: ProductServiceConstructor) {
    this.productsModel = productsModel
  }

  create: ProductsServiceCreate = async (productsToCreate) => {
    return await this.productsModel.create(productsToCreate)
  }

  getAll: ProductsServiceGetAll = async () => {
    return await this.productsModel.getAll()
  }

  updateMany: ProductsServiceUpdateMany = async (products) => {
    return await this.productsModel.updateMany(products)
  }

  deleteMany: ProductsServiceDelete = async (ids) => {
    return await this.productsModel.deleteMany(ids)
  }
}
