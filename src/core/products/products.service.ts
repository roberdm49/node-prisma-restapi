import { BadRequestError } from '@/errors'
import { IProductRepository, IProductService } from './products.interfaces'
import {
  ProductServiceConstructor,
  ProductWithoutId,
  ProductsServiceCreateMany,
  ProductsServiceDelete,
  ProductsServiceEveryProductBelongToSameTenant,
  ProductsServiceGetAll,
  ProductsServiceGetManyById,
  ProductsServiceGetOneById,
  ProductsServiceUpdateMany
} from './products.types'
import { ErrorClientMessages } from '@/enums/errors'
import { mergeProductsAndProductsToUpdate } from '@/utils/transformationsProductsUpdate'

export default class ProductsService implements IProductService {
  private readonly productsRepository: IProductRepository

  constructor ({ productsRepository }: ProductServiceConstructor) {
    this.productsRepository = productsRepository
  }

  createMany: ProductsServiceCreateMany = async (tenantId, productsToCreate) => {
    const productsToCreateWithTenantId: ProductWithoutId[] = productsToCreate.map(productToCreate => {
      return { ...productToCreate, tenantId }
    })

    return await this.productsRepository.createMany(productsToCreateWithTenantId)
  }

  getAll: ProductsServiceGetAll = async (tenantId) => {
    return await this.productsRepository.getAll(tenantId)
  }

  updateMany: ProductsServiceUpdateMany = async (tenantId, productsUpdateEntry) => {
    const productIds = productsUpdateEntry.map(productUpdateEntry => productUpdateEntry.id)
    if (!this.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const dbProducts = await this.getManyById(productIds)
    const productsToUpdate = mergeProductsAndProductsToUpdate(dbProducts, productsUpdateEntry)

    return await this.productsRepository.updateMany(tenantId, productsToUpdate)
  }

  deleteMany: ProductsServiceDelete = async (tenantId, productIds) => {
    if (!this.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.productsRepository.deleteMany(tenantId, productIds)
  }

  everyProductBelongToSameTenant: ProductsServiceEveryProductBelongToSameTenant = async (tenantId, productIds) => {
    const products = await this.getManyById(productIds)

    for (const product of products) {
      if (product.tenantId !== tenantId) return false
    }

    return true
  }

  getManyById: ProductsServiceGetManyById = async (productIds) => {
    return await this.productsRepository.getManyById(productIds)
  }

  getOneById: ProductsServiceGetOneById = async (productId) => {
    const product = await this.productsRepository.getOneById(productId)
    return product
  }
}
