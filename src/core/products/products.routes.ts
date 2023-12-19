import express, { Router } from 'express'
import ProductsService from './products.service'
import ProductsController from './products.controller'
import { IProductModel } from './products.interfaces'

export const createProductRoutes = ({ productsModel }: { productsModel: IProductModel }): Router => {
  const router = express.Router()
  const productsService = new ProductsService({ productsModel })
  const productsController = new ProductsController({ productsService })

  router.get('/get', productsController.getProducts)
  router.post('/create', productsController.createProducts)

  return router
}
