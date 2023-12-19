import { IProductModel, IProductService } from './products.interfaces'
import { TProductsServiceCreate, TProductsServiceGetAll } from './products.types'

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
}
