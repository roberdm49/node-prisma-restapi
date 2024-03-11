import express from 'express'
import { protectedRouteMiddleware } from '@/middlewares/protectedRoute'
import ProductsService from './products.service'
import ProductsController from './products.controller'
import { ProductsCreateRoutes } from './products.types'

export const createProductsRoutes: ProductsCreateRoutes = ({ productsRepository }) => {
  const router = express.Router()
  const productsService = new ProductsService({ productsRepository })
  const productsController = new ProductsController({ productsService })

  router.get('/get', [protectedRouteMiddleware], productsController.getAll)
  router.post('/create', [protectedRouteMiddleware], productsController.create)
  router.patch('/update', [protectedRouteMiddleware], productsController.updateMany)
  router.delete('/delete', [protectedRouteMiddleware], productsController.deleteMany)

  return router
}
