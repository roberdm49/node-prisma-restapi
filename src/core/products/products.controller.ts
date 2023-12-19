import { RequestHandler } from '@/types/RequestHandler'
import { IProductController, IProductService } from './products.interfaces'

export default class ProductsController implements IProductController {
  private readonly productsService: IProductService

  constructor ({ productsService }: { productsService: IProductService }) {
    this.productsService = productsService
  }

  createProducts: RequestHandler = async (request, response, next) => {
    try {
      const products = await this.productsService.createProducts(request.body)
      return response.json(products)
    } catch (error) {
      next()
    }
  }

  getProducts: RequestHandler = async (request, response, next) => {
    try {
      const products = await this.productsService.getProducts()
      return response.json(products)
    } catch (error) {
      next()
    }
  }
}
