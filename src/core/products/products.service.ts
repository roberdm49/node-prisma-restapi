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

  create: ProductsServiceCreate = async (tenantId, productsToCreate) => {
    const productsToCreateWithTenantId = productsToCreate.map(productToCreate => {
      return { ...productToCreate, tenantId }
    })
    return await this.productsModel.create(productsToCreateWithTenantId)
  }

  getAll: ProductsServiceGetAll = async (tenantId) => {
    return await this.productsModel.getAll(tenantId)
  }

  updateMany: ProductsServiceUpdateMany = async (tenantId, products) => {
    return await this.productsModel.updateMany(tenantId, products)
  }

  deleteMany: ProductsServiceDelete = async (tenantId, ids) => {
    return await this.productsModel.deleteMany(tenantId, ids)
  }
}
