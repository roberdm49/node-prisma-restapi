import express from 'express'
import ProductsService from './products.service'
import ProductsController from './products.controller'
import { ProductsCreateRoutes } from './products.types'

export const createProductsRoutes: ProductsCreateRoutes = ({ productsModel }) => {
  const router = express.Router()
  const productsService = new ProductsService({ productsModel })
  const productsController = new ProductsController({ productsService })

  router.get('/get', productsController.getAll)
  router.post('/create', productsController.create)

  return router
}
