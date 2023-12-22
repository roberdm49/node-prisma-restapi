import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { createAuthRoutes } from '@/core/auth/auth.routes'
import { createProductsRoutes } from '@/core/products/products.routes'
import { createUsersRoutes } from '@/core/users/users.routes'
import { createCompanyRoutes } from './core/company/company.routes'
import { createDailySaleRoutes } from './core/daily-sale/daily-sale.routes'
import { createPurchaseRoutes } from './core/purchase/purchase.routes'
import { createCurrencyRoutes } from './core/currency/currency.routes'
import AuthModel from './core/auth/auth.model'
import ProductsModel from './core/products/products.model'
import UsersModel from './core/users/users.model'
import CompanyModel from './core/company/company.model'
import DailySaleModel from './core/daily-sale/daily-sale.model'
import PurchaseModel from './core/purchase/purchase.model'
import CurrencyModel from './core/currency/currency.model'

dotenv.config()

const app = express()
const port = process.env.APP_PORT ?? 3000

app.use(morgan('dev'))
app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded

const authModel = new AuthModel()
const productsModel = new ProductsModel()
const usersModel = new UsersModel()
const companyModel = new CompanyModel()
const dailySaleModel = new DailySaleModel()
const purchaseModel = new PurchaseModel()
const currencyModel = new CurrencyModel()

app.use('/auth', createAuthRoutes({ authModel }))
app.use('/products', createProductsRoutes({ productsModel }))
app.use('/users', createUsersRoutes({ usersModel }))
app.use('/company', createCompanyRoutes({ companyModel }))
app.use('/daily-sale', createDailySaleRoutes({ dailySaleModel }))
app.use('/purchase', createPurchaseRoutes({ purchaseModel }))
app.use('/currency', createCurrencyRoutes({ currencyModel }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
