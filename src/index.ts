import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const main = async (): Promise<void> => {
  const app = await import('./app')
  app.default()
}

main()
  .then(() => {
    console.log('App file loaded successfully!')
  })
  .catch(error => {
    console.log('An error occurred loading the app file.')
    console.log(error)
  })
