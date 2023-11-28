import { PrismaClient } from '@prisma/client'
import { RequestHandler } from '@/types/RequestHandler'
import { UserInterface } from '@/interfaces'

const prisma = new PrismaClient()

const createUser: RequestHandler = async (request, response) => {
  const { firstname, lastname, username, password, tenantId }: UserInterface = request.body
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

export default { createUser }
