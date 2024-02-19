import { BadRequestError } from '@/errors'
import { IProductModel, IProductService } from './products.interfaces'
import {
  Product,
  ProductServiceConstructor,
  ProductWithoutId,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceUpdateMany
} from './products.types'
import { ErrorClientMessages } from '@/enums/errors'

export default class ProductsService implements IProductService {
  private readonly productsModel: IProductModel

  constructor ({ productsModel }: ProductServiceConstructor) {
    this.productsModel = productsModel
  }

  createMany: ProductsServiceCreateMany = async (tenantId, productsToCreate) => {
    const productsToCreateWithTenantId: ProductWithoutId[] = productsToCreate.map(productToCreate => {
      return { ...productToCreate, tenantId }
    })

    return await this.productsModel.createMany(productsToCreateWithTenantId)
  }

  getAll: ProductsServiceGetAll = async (tenantId) => {
    return await this.productsModel.getAll(tenantId)
  }

  updateMany: ProductsServiceUpdateMany = async (tenantId, products) => {
    const productIds = products.map(product => product.id)
    if (!this.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.productsModel.updateMany(tenantId, products)
  }

  deleteMany: ProductsServiceDelete = async (tenantId, productIds) => {
    if (!this.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.productsModel.deleteMany(tenantId, productIds)
  }

  everyProductBelongToSameTenant: ProductsServiceEveryProductBelongToSameTenant = async (tenantId, productIds) => {
    const products = await this.getManyById(productIds)

    for (const product of products) {
      if (product.tenantId !== tenantId) return false
    }

    return true
  }

  getManyById = async (productIds: string[]): Promise<Product[]> => {
    const products = await this.productsModel.getManyById(productIds)
    return products
  }
}
