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
  ProductsServiceUpdateMany
} from './products.types'
import { ErrorClientMessages } from '@/enums/errors'
import { mergeProductsAndProductsToUpdate, transformProductsToFlatProductHistory } from '@/utils/transformationsProducts'

export default class ProductsService implements IProductService {
  private readonly productsRepository: IProductRepository

  constructor ({ productsRepository }: ProductServiceConstructor) {
    this.productsRepository = productsRepository
  }

  createMany: ProductsServiceCreateMany = async (tenantId, productsToCreate) => {
    const productsToCreateWithTenantId: ProductWithoutId[] = productsToCreate.map(productToCreate => {
      return { ...productToCreate, tenantId }
    })

    const createdProductsWithMetadataArray = await this.productsRepository.createMany(productsToCreateWithTenantId)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(createdProductsWithMetadataArray)

    return productsWithFlatHistoryMetadata
  }

  getAll: ProductsServiceGetAll = async (tenantId) => {
    const productsWithHistoryMetadataArray = await this.productsRepository.getAll(tenantId)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(productsWithHistoryMetadataArray)

    return productsWithFlatHistoryMetadata
  }

  updateMany: ProductsServiceUpdateMany = async (tenantId, productsUpdateEntry) => {
    const productIds = productsUpdateEntry.map(productUpdateEntry => productUpdateEntry.id)
    if (!(await this.everyProductBelongToSameTenant(tenantId, productIds))) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const dbProducts = await this.getManyById(productIds)
    const productsToUpdate = mergeProductsAndProductsToUpdate(dbProducts, productsUpdateEntry)

    const updatedProductsWithMetadataArray = await this.productsRepository.updateMany(tenantId, productsToUpdate)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(updatedProductsWithMetadataArray)

    return productsWithFlatHistoryMetadata
  }

  deleteMany: ProductsServiceDelete = async (tenantId, productIds) => {
    if (!(await this.everyProductBelongToSameTenant(tenantId, productIds))) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    return await this.productsRepository.deleteMany(tenantId, productIds)
  }

  everyProductBelongToSameTenant: ProductsServiceEveryProductBelongToSameTenant = async (tenantId, productIds) => {
    const products = await this.getManyById(productIds)

    for (const product of products) {
      if (product.tenantId !== tenantId) return false
    }

    if (products.length !== productIds.length) {
      return false
    }

    return true
  }

  getManyById: ProductsServiceGetManyById = async (productIds) => {
    const productsWithHistoryMetadataArray = await this.productsRepository.getManyById(productIds)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(productsWithHistoryMetadataArray)

    return productsWithFlatHistoryMetadata
  }
}
