import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'

dotenv.config()

interface UserInterface {
  username: string,
  firstname: string,
  lastname: string,
  password: string,
  tenantId: number,
}

interface SignUpInterface {
  tenantName: string,
  username: string,
  firstname: string,
  lastname: string,
  password: string,
}

const app = express()
const prisma = new PrismaClient()
const port = process.env.APP_PORT

app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.post('/user', async (request, response) => {
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
  
  response.send(JSON.stringify(user))
})

app.post('/sign-up', async (request, response) => {
  const { tenantName, firstname, lastname, username, password }: SignUpInterface = request.body
  const tenantAndUser = await prisma.tenant.create({
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
  
  response.send(JSON.stringify(tenantAndUser))
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
