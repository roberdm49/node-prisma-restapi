import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { createAuthRoutes } from '@/core/auth/auth.routes'
import { createProductsRoutes } from '@/core/products/products.routes'
import { createUsersRoutes } from '@/core/users/users.routes'
import AuthModel from './core/auth/auth.model'
import ProductsModel from './core/products/products.model'
import UsersModel from './core/users/users.model'

dotenv.config()

const app = express()
const port = process.env.APP_PORT ?? 3000

app.use(morgan('dev'))
app.use(express.json()) // http://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false })) // http://expressjs.com/en/5x/api.html#express.urlencoded

const authModel = new AuthModel()
const productsModel = new ProductsModel()
const usersModel = new UsersModel()

app.use('/auth', createAuthRoutes({ authModel }))
app.use('/products', createProductsRoutes({ productsModel }))
app.use('/users', createUsersRoutes({ usersModel }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
