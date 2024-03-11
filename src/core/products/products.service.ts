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
import { mergeProductsAndProductsToUpdate, transformProductsToFlatProductHistory, transformSingleProductToFlatProduct } from '@/utils/transformationsProducts'

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
    const productsWithHistoryMetadataArray = await this.productsRepository.getAll(tenantId)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(productsWithHistoryMetadataArray)

    return productsWithFlatHistoryMetadata
  }

  updateMany: ProductsServiceUpdateMany = async (tenantId, productsUpdateEntry) => {
    const productIds = productsUpdateEntry.map(productUpdateEntry => productUpdateEntry.id)
    if (!this.everyProductBelongToSameTenant(tenantId, productIds)) {
      throw new BadRequestError(ErrorClientMessages.BadRequest)
    }

    const dbProducts = await this.getManyById(productIds)
    const productsToUpdate = mergeProductsAndProductsToUpdate(dbProducts, productsUpdateEntry)

    const updatedProductsWithMetadataArray = await this.productsRepository.updateMany(tenantId, productsToUpdate)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(updatedProductsWithMetadataArray)

    return productsWithFlatHistoryMetadata
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
    const productsWithHistoryMetadataArray = await this.productsRepository.getManyById(productIds)
    const productsWithFlatHistoryMetadata = transformProductsToFlatProductHistory(productsWithHistoryMetadataArray)

    return productsWithFlatHistoryMetadata
  }

  getOneById: ProductsServiceGetOneById = async (productId) => {
    const product = await this.productsRepository.getOneById(productId)
    const productWithHistoryMetadata = transformSingleProductToFlatProduct(product)

    return productWithHistoryMetadata
  }
}
