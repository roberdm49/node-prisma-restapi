import { IProductModel, IProductService } from './products.interfaces'
import { TProductsServiceCreate, TProductsServiceDelete, TProductsServiceGetAll, TProductsServiceUpdateMany } from './products.types'

export default class ProductsService implements IProductService {
  private readonly productsModel: IProductModel

  constructor ({ productsModel }: { productsModel: IProductModel }) {
    this.productsModel = productsModel
  }

  createProducts: TProductsServiceCreate = async (productsToCreate) => {
    return await this.productsModel.create(productsToCreate)
  }

  getProducts: TProductsServiceGetAll = async () => {
    return await this.productsModel.getAll()
  }

  updateMany: TProductsServiceUpdateMany = async (products) => {
    return await this.productsModel.updateMany(products)
  }

  delete: TProductsServiceDelete = async (id) => {
    return await this.productsModel.delete(id)
  }
}
