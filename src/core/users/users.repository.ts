import prisma from '@/config/db'
import { IUsersRepository } from './users.interfaces'
import { UsersRepositoryCreate, UsersRepositoryGetOneById, UsersRepositoryGetOneByUsername, UsersRepositoryUpdate } from './users.types'

export default class UsersRepository implements IUsersRepository {
  create: UsersRepositoryCreate = async (userData) => {
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

  update: UsersRepositoryUpdate = async (userData) => {
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

  getOneByUsername: UsersRepositoryGetOneByUsername = async (username) => {
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    })

    return user
  }

  getOneById: UsersRepositoryGetOneById = async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
}
