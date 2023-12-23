import { IProductModel, IProductService, IProductServiceConstructor } from './products.interfaces'
import { TProductsServiceCreate, TProductsServiceDelete, TProductsServiceGetAll, TProductsServiceUpdateMany } from './products.types'

export default class ProductsService implements IProductService {
  private readonly productsModel: IProductModel

  constructor ({ productsModel }: IProductServiceConstructor) {
    this.productsModel = productsModel
  }

  create: TProductsServiceCreate = async (productsToCreate) => {
    return await this.productsModel.create(productsToCreate)
  }

  getAll: TProductsServiceGetAll = async () => {
    return await this.productsModel.getAll()
  }

  updateMany: TProductsServiceUpdateMany = async (products) => {
    return await this.productsModel.updateMany(products)
  }

  deleteMany: TProductsServiceDelete = async (ids) => {
    return await this.productsModel.deleteMany(ids)
  }
}
