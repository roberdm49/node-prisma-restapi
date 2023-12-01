import productsService from './products.service'
import { RequestHandler } from '@/types/RequestHandler'

const createProducts: RequestHandler = async (request, response, next) => {
  try {
    const products = await productsService.createProducts(request.body)
    return response.json(products)
  } catch (error) {
    next()
  }
}

const getProducts: RequestHandler = async (request, response, next) => {
  try {
    const products = await productsService.getProducts()
    return response.json(products)
  } catch (error) {
    next()
  }
}

export default {
  createProducts,
  getProducts
}
