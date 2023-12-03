import { PrismaClient } from '@prisma/client'
import { SignUpInterface } from '@/interfaces'
import { hashPassword } from '@/utils/hash'
import { TenantInterface } from '@/interfaces/Tenant'

const prisma = new PrismaClient()

const signUp = async (tenantAndUser: SignUpInterface): Promise<TenantInterface> => {
  const { tenantName, username, firstname, lastname, password } = tenantAndUser
  const hashedPassword = hashPassword(password)

  const tenant = await prisma.tenant.create({
    data: {
      name: tenantName,
      users: {
        create: {
          username,
          firstname,
          lastname,
          password: hashedPassword
        }
      }
    }
  })

  return tenant
}

const logIn = async () => {

}

export default {
  signUp,
  logIn
}
