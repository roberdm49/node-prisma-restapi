import { PrismaClient } from '@prisma/client'
import { RequestHandler } from '@/types/RequestHandler'
import { UserInterface } from '@/interfaces'

const prisma = new PrismaClient()

const createUser: RequestHandler = async (request, response) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

export default { createUser }
