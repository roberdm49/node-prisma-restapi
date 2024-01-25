import prisma from '@/config/db'
import { IUsersModel } from './users.interfaces'
import { UsersModelCreate, UsersModelGetOneById, UsersModelGetOneByUsername, UsersModelUpdate } from './users.types'

export default class UsersModel implements IUsersModel {
  create: UsersModelCreate = async (userData) => {
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

  update: UsersModelUpdate = async (userData) => {
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

  getOneByUsername: UsersModelGetOneByUsername = async (username) => {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  }

  getOneById: UsersModelGetOneById = async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
}
