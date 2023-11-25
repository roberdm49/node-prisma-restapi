import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()
const port = process.env.APP_PORT

app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.send('Hello world')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
