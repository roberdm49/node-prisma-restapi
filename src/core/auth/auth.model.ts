import prisma from '@/config/db'
import { IAuthModel } from './auth.interfaces'
import { AuthModelCreate } from './auth.types'

export default class AuthModel implements IAuthModel {
  create: AuthModelCreate = async (signUpData) => {
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
