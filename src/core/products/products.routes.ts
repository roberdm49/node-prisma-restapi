import express from 'express'
import productsController from './products.controller'

const router = express.Router()

router.get('/get', productsController.getProducts)
router.post('/create', productsController.createProducts)

export default router
