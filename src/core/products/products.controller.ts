import { HttpStatus } from '@/enums/httpStatus'
import { RequestHandler } from 'express'
import { IProductController, IProductService } from './products.interfaces'
import { ProductControllerConstructor, ProductEntryWithNull, ProductEntryWithUndefined, ProductUpdate } from './products.types'
import { createSchema, deleteSchema, updateSchema } from './product.zod-schema'
import { parseProductsEntryFromUndefinedToNull } from '@/utils/parseProducts'

export default class ProductsController implements IProductController {
  private readonly productsService: IProductService

  constructor ({ productsService }: ProductControllerConstructor) {
    this.productsService = productsService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const productsWithUndefined: ProductEntryWithUndefined[] = createSchema.parse(request.body)
      const productsWithNull: ProductEntryWithNull[] = parseProductsEntryFromUndefinedToNull(productsWithUndefined)
      const productsCreated = await this.productsService.createMany(tenantId, productsWithNull)
      return response.status(HttpStatus.Created).json(productsCreated)
    } catch (error) {
      next(error)
    }
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const products = await this.productsService.getAll(tenantId)
      return response.status(HttpStatus.OK).json(products)
    } catch (error) {
      next(error)
    }
  }

  updateMany: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const products: ProductUpdate[] = updateSchema.parse(request.body)
      const updatedProducts = await this.productsService.updateMany(tenantId, products)
      return response.status(HttpStatus.OK).json(updatedProducts)
    } catch (error) {
      next(error)
    }
  }

  // TODO: replace it by a logical delete, instead of physical delete
  deleteMany: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const ids = deleteSchema.parse(request.body)
      const removedProduct = await this.productsService.deleteMany(tenantId, ids)
      return response.status(HttpStatus.OK).json(removedProduct)
    } catch (error) {
      next(error)
    }
  }
}
