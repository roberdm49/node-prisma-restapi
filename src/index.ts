import chalk from 'chalk'
import dotenv from 'dotenv'
import { GlobalEnv } from './utils/constants'
dotenv.config({ path: '.env' })

const main = async (): Promise<void> => {
  const { createApp } = await import('./app')

  const app = createApp()
  const port = !isNaN(GlobalEnv.APP_PORT)
    ? GlobalEnv.APP_PORT
    : 3000

  app.listen(port, () => {
    console.log(`✅ App listening on ${chalk.cyan.bold(`http://localhost:${port}`)}`)
  })
}

main()
  .then(() => {
    console.log('App file loaded successfully!')
  })
  .catch(error => {
    console.log('An error occurred loading the app file.')
    console.log(error)
  })
