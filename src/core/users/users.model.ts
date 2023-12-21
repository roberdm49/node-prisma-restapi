import prisma from '@/db'
import { IUsersModel } from './users.interfaces'
import { TUsersModelCreate, TUsersModelUpdate } from './users.types'

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

  update: TUsersModelUpdate = async (userData) => {
    const user = await prisma.user.update({
      where: {
        id: userData.id
      },
      data: {
        ...userData
      }
    })

    return user
  }
}
