import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const populateDB = async () => {
  console.log('Initialized!')

  const tenant1 = await prisma.tenant.create({
    data: {
      name: 'Dani\'s',
      users: {
        createMany: {
          data: [
            {
              firstname: 'Roberto',
              lastname: 'Marcos',
              username: 'roberdmarcos',
              password: 'superhashedpassword'
            },
            {
              firstname: 'Micaela',
              lastname: 'Vanzato',
              username: 'micavanzato',
              password: 'superhashedandsecretpassword'
            }
          ]
        }
      }
    }
  })

  const tenant2 = await prisma.tenant.create({
    data: {
      name: 'Gonza LLC',
      users: {
        create: {
          firstname: 'Gonzalo',
          lastname: 'Vanzato',
          username: 'gvanzato123',
          password: 'superhashedpasswordthethird'
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
