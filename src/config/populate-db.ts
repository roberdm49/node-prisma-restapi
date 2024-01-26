import chalk from 'chalk'
import bcrypt from 'bcrypt'
import prisma from '@/config/db'
import { GlobalEnv } from '@/utils/constants'

export const populateDB = async (): Promise<void> => {
  const userOnePassword = await bcrypt.hash('superhashedpassword', GlobalEnv.HASH_ROUNDS)
  const userTwoPassword = await bcrypt.hash('superhashedandsecretpassword', GlobalEnv.HASH_ROUNDS)
  const userThreePassword = await bcrypt.hash('superhashedpasswordthethird', GlobalEnv.HASH_ROUNDS)

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
              password: userOnePassword
            },
            {
              firstname: 'Micaela',
              lastname: 'Vanzato',
              username: 'micavanzato',
              password: userTwoPassword
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
          password: userThreePassword
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

  const company = await prisma.company.create({
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

populateDB()
  .then(() => {
    console.log(chalk.cyan.bold('DB populated succesfully.'))
    process.exit(0)
  })
  .catch(error => {
    console.log(chalk.red.bold(error))
    process.exit(1)
  })
