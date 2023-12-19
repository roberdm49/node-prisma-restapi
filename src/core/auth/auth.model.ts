import { PrismaClient } from '@prisma/client'
import { IAuthModel } from './auth.interfaces'
import { TAuthModelCreate } from './auth.types'

const prisma = new PrismaClient()

export default class AuthModel implements IAuthModel {
  create: TAuthModelCreate = async (signUpData) => {
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
