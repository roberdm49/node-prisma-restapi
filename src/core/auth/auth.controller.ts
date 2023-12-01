import authService from './auth.service'
import { RequestHandler } from '@/types/RequestHandler'

const signUp: RequestHandler = async (request, response, next) => {
  try {
    const tenant = await authService.signUp(request.body)
    return response.json(tenant)
  } catch (error) {
    next()
  }
}

export default {
  signUp
}
