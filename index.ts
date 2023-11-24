import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  const users = await prisma.user.findMany({
    include: {
      productCompanies: true
    }
  })

  users.forEach(user => console.log(JSON.stringify(user)))
}

main()
