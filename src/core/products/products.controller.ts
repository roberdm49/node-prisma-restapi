import { HttpStatus } from '@/enums/httpStatus'
import { RequestHandler } from 'express'
import { IProductController, IProductService } from './products.interfaces'
import { Product, ProductControllerConstructor } from './products.types'

export default class ProductsController implements IProductController {
  private readonly productsService: IProductService

  constructor ({ productsService }: ProductControllerConstructor) {
    this.productsService = productsService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const { tenantId } = request.user
      const products = await this.productsService.createMany(tenantId, request.body)
      return response.status(HttpStatus.Created).json(products)
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
      const products: Product[] = request.body
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
