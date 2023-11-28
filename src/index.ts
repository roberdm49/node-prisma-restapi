import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

interface UserInterface {
  username: string
  firstname: string
  lastname: string
  password: string
  tenantId: number
}

interface SignUpInterface {
  tenantName: string
  username: string
  firstname: string
  lastname: string
  password: string
}

const app = express()
const prisma = new PrismaClient()
const port = process.env.APP_PORT ?? 3000

app.use(express.json()) // search why is this
app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.post('/user', (request, response) => {
  try {
    const { firstname, lastname, username, password, tenantId }: UserInterface = request.body
    const user = prisma.user.create({
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

    response.send(JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
})

app.post('/sign-up', async (request, response) => {
  try {
    const { tenantName, firstname, lastname, username, password }: SignUpInterface = request.body
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

    response.send(JSON.stringify(tenant))
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
