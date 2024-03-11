import { HttpStatus } from '@/enums/httpStatus'
import { RequestHandler } from 'express'
import { IProductController, IProductService } from './products.interfaces'
import { ProductControllerConstructor, ProductEntry, ProductUpdate } from './products.types'
import { createSchema, updateSchema } from './product.zod-schema'

export default class ProductsController implements IProductController {
  private readonly productsService: IProductService

  constructor ({ productsService }: ProductControllerConstructor) {
    this.productsService = productsService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const products: ProductEntry[] = createSchema.parse(request.body)
      const productsCreated = await this.productsService.createMany(tenantId, products)
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

  deleteMany: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const ids: string[] = request.body
      const removedProduct = await this.productsService.deleteMany(tenantId, ids)
      return response.status(HttpStatus.OK).json(removedProduct)
    } catch (error) {
      next(error)
    }
  }
}
