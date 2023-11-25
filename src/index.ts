import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function populateDB () {
  console.log("Initialized!")
  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Dani\'s'
    }
  })

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Gonza LLC'
    }
  })

  await prisma.user.create({
    data: {
      firstname: 'Roberto',
      lastname: 'Marcos',
      username: 'roberdmarcos',
      password: 'superhashedpassword',
      tenant: {
        connect: {
          id: tenant1.id
        }
      }
    }
  })

  await prisma.user.create({
    data: {
      firstname: 'Micaela',
      lastname: 'Vanzato',
      username: 'micavanzato',
      password: 'superhashedandsecretpassword',
      tenant: {
        connect: {
          id: tenant1.id
        }
      }
    }
  })

  await prisma.user.create({
    data: {
      firstname: 'Gonzalo',
      lastname: 'Vanzato',
      username: 'gvanzato123',
      password: 'superhashedpasswordthethird',
      tenant: {
        connect: {
          id: tenant2.id
        }
      }
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
      tenant: {
        connect: {
          id: tenant2.id
        }
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Block 38g',
      price: 320,
      tenant: {
        connect: {
          id: tenant2.id
        }
      },
      company: {
        connect: {
          id: company.id
        }
      },
      currency: {
        connect: {
          id: currency.id
        }
      }
    }
  })

  await prisma.product.create({
    data: {
      name: 'Kinder Maxi',
      price: 250,
      tenant: {
        connect: {
          id: tenant1.id
        }
      },
      currency: {
        connect: {
          id: currency.id
        }
      }
    }
  })
}

function main () {
  // populateDB()
}

main()
