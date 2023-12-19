import { PrismaClient } from '@prisma/client'
import { IUsersModel } from './users.interfaces'
import { TUsersModelCreate } from './users.types'

const prisma = new PrismaClient()

export default class UsersModel implements IUsersModel {
  create: TUsersModelCreate = async (userData) => {
    const { firstname, lastname, username, password, tenantId } = userData
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        password,
        tenant: {
          connect: {
            id: tenantId
          }
        }
      }
    })

    return user
  }
}
