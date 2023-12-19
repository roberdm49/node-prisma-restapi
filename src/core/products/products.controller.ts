import { RequestHandler } from '@/types/RequestHandler'
import { IProduct, IProductController, IProductService } from './products.interfaces'

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

  updateMany: RequestHandler = async (request, response, next) => {
    try {
      const products: IProduct[] = request.body
      const updatedProducts = await this.productsService.updateMany(products)
      return response.json(updatedProducts)
    } catch (error) {
      next()
    }
  }

  deleteMany: RequestHandler = async (request, response, next) => {
    try {
      const ids: string[] = request.body
      const removedProduct = await this.productsService.deleteMany(ids)
      return removedProduct
    } catch (error) {
      next()
    }
  }
}
