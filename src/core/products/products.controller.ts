import { HttpStatus } from '@/enums/httpStatus'
import { RequestHandler } from 'express'
import { IProduct, IProductController, IProductControllerConstructor, IProductService } from './products.interfaces'

export default class ProductsController implements IProductController {
  private readonly productsService: IProductService

  constructor ({ productsService }: IProductControllerConstructor) {
    this.productsService = productsService
  }

  create: RequestHandler = async (request, response, next) => {
    try {
      const products = await this.productsService.create(request.body)
      return response.status(HttpStatus.Created).json(products)
    } catch (error) {
      next(error)
    }
  }

  getAll: RequestHandler = async (request, response, next) => {
    try {
      const products = await this.productsService.getAll()
      return response.status(HttpStatus.OK).json(products)
    } catch (error) {
      next(error)
    }
  }

  updateMany: RequestHandler = async (request, response, next) => {
    try {
      const products: IProduct[] = request.body
      const updatedProducts = await this.productsService.updateMany(products)
      return response.status(HttpStatus.OK).json(updatedProducts)
    } catch (error) {
      next(error)
    }
  }

  deleteMany: RequestHandler = async (request, response, next) => {
    try {
      const ids: string[] = request.body
      const removedProduct = await this.productsService.deleteMany(ids)
      return response.status(HttpStatus.OK).json(removedProduct)
    } catch (error) {
      next(error)
    }
  }
}
