import express from 'express'
import userController from '@/controllers/user.controller'

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('WORKING USERS!')
})

router.post('/user', userController.createUser)

export default router
