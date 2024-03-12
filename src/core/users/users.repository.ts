import prisma from '@/config/db'
import { IUsersRepository } from './users.interfaces'
import { UsersRepositoryGetOneById, UsersRepositoryGetOneByUsername } from './users.types'

export default class UsersRepository implements IUsersRepository {
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
