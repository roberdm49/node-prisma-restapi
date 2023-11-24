import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function populateDB () {
  await prisma.user.create({
    data: {
      firstname: 'Roberto',
      lastname: 'Marcos',
      username: 'roberdmarcos',
      password: 'superhashedpassword',
    }
  })

  const userMica = await prisma.user.create({
    data: {
      firstname: 'Micaela',
      lastname: 'Vanzato',
      username: 'micavanzato',
      password: 'superhashedandsecretpassword',
    }
  })

  const userGonza = await prisma.user.create({
    data: {
      firstname: 'Gonzalo',
      lastname: 'Vanzato',
      username: 'gvanzato123',
      password: 'superhashedpasswordthethird',
    }
  })

  const currency = await prisma.currency.create({
    data: {
      name: 'Pesos Argentinos',
      isoCode: 'ARS',
      isoNum: '032'
    }
  })

  const company = await prisma.productCompany.create({
    data: {
      name: 'Arcor',
      user: {
        connect: {
          id: userGonza.id
        }
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Block 38g',
      price: 320,
      user: {
        connect: {
          id: userGonza.id
        }
      },
      company: {
        connect: {
          id: company.id
        }
      },
    }
  })

  await prisma.product.create({
    data: {
      name: 'Kinder Maxi',
      price: 250,
      user: {
        connect: {
          id: userMica.id
        }
      }
    }
  })
}

function main () {
  // populateDB()
}

main()
