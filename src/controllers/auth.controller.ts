import { SignUpInterface } from '@/interfaces'
import { RequestHandler } from '@/types/RequestHandler'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const test: RequestHandler = async (request, response) => {
  response.send('auth test working!')
}

const createTenantAndUser: RequestHandler = async (request, response) => {
  try {
    const { tenantName, username, firstname, lastname, password }: SignUpInterface = request.body
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
  } catch (error) {
    console.log(error)
  }
}

export default {
  createTenantAndUser, test
}
