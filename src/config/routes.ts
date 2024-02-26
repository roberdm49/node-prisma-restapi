import express, { Router } from 'express'
// Routes creators
import { createAuthRoutes } from '@/core/auth/auth.routes'
import { createProductsRoutes } from '@/core/products/products.routes'
import { createUsersRoutes } from '@/core/users/users.routes'
import { createCompanyRoutes } from '@/core/company/company.routes'
import { createDailySaleRoutes } from '@/core/daily-sale/daily-sale.routes'
import { createPurchaseRoutes } from '@/core/purchase/purchase.routes'
import { createCurrencyRoutes } from '@/core/currency/currency.routes'
// Repositories
import AuthRepository from '@/core/auth/auth.repository'
import ProductsRepository from '@/core/products/products.repository'
import UsersRepository from '@/core/users/users.repository'
import CompanyRepository from '@/core/company/company.repository'
import DailySaleRepository from '@/core/daily-sale/daily-sale.repository'
import PurchaseRepository from '@/core/purchase/purchase.repository'
import CurrencyRepository from '@/core/currency/currency.repository'
// Services
import ProductsService from '@/core/products/products.service'
import DailySaleService from '@/core/daily-sale/daily-sale.service'
import CurrencyService from '@/core/currency/currency.service'

export const configureRoutes = (): Router => {
  const router = express.Router()

  const authRepository = new AuthRepository()
  const productsRepository = new ProductsRepository()
  const usersRepository = new UsersRepository()
  const companyRepository = new CompanyRepository()
  const dailySaleRepository = new DailySaleRepository()
  const purchaseRepository = new PurchaseRepository()
  const currencyRepository = new CurrencyRepository()

  const productService = new ProductsService({ productsRepository })
  const dailySaleService = new DailySaleService({ dailySaleRepository })
  const currencyService = new CurrencyService({ currencyRepository })

  router.use('/auth', createAuthRoutes({ authRepository, usersRepository }))
  router.use('/products', createProductsRoutes({ productsRepository }))
  router.use('/users', createUsersRoutes({ usersRepository }))
  router.use('/company', createCompanyRoutes({ companyRepository }))
  router.use('/daily-sale', createDailySaleRoutes({ dailySaleRepository }))
  router.use('/purchase', createPurchaseRoutes({ purchaseRepository, productService, dailySaleService, currencyService }))
  router.use('/currency', createCurrencyRoutes({ currencyRepository }))

  return router
}
