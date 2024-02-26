import prisma from '@/config/db'
import { IAuthRepository } from './auth.interfaces'
import { AuthRepositoryCreate } from './auth.types'

export default class AuthRepository implements IAuthRepository {
  create: AuthRepositoryCreate = async (signUpData) => {
    const { tenantName, username, firstname, lastname, password } = signUpData

    const tenant = await prisma.tenant.create({
      data: {
        name: tenantName,
        users: {
          create: {
            username,
            firstname,
            lastname,
            password
          }
        }
      }
    })

    return tenant
  }
}
