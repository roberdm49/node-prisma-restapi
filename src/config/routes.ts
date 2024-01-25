import express, { Router } from 'express'
// Routes creators
import { createAuthRoutes } from '@/core/auth/auth.routes'
import { createProductsRoutes } from '@/core/products/products.routes'
import { createUsersRoutes } from '@/core/users/users.routes'
import { createCompanyRoutes } from '@/core/company/company.routes'
import { createDailySaleRoutes } from '@/core/daily-sale/daily-sale.routes'
import { createPurchaseRoutes } from '@/core/purchase/purchase.routes'
import { createCurrencyRoutes } from '@/core/currency/currency.routes'
// Models
import AuthModel from '@/core/auth/auth.model'
import ProductsModel from '@/core/products/products.model'
import UsersModel from '@/core/users/users.model'
import CompanyModel from '@/core/company/company.model'
import DailySaleModel from '@/core/daily-sale/daily-sale.model'
import PurchaseModel from '@/core/purchase/purchase.model'
import CurrencyModel from '@/core/currency/currency.model'

export const configureRoutes = (): Router => {
  const router = express.Router()

  const authModel = new AuthModel()
  const productsModel = new ProductsModel()
  const usersModel = new UsersModel()
  const companyModel = new CompanyModel()
  const dailySaleModel = new DailySaleModel()
  const purchaseModel = new PurchaseModel()
  const currencyModel = new CurrencyModel()

  router.use('/auth', createAuthRoutes({ authModel, usersModel }))
  router.use('/products', createProductsRoutes({ productsModel }))
  router.use('/users', createUsersRoutes({ usersModel }))
  router.use('/company', createCompanyRoutes({ companyModel }))
  router.use('/daily-sale', createDailySaleRoutes({ dailySaleModel }))
  router.use('/purchase', createPurchaseRoutes({ purchaseModel }))
  router.use('/currency', createCurrencyRoutes({ currencyModel }))

  return router
}
