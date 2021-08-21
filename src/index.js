import debug from 'debug'
import express from 'express'
import {ROOT_APP_NAMESPACE, SERVER_PORT} from './configs'

import {errorHandler} from './middlewares/error'
import {setupLogStash, initDatabaseConnection} from './utils/setup'

import 'express-async-errors'

async function initialize(cb) {
  const app = express()

  app.get('/', async (req, res, next) => {
    throw new Error('sdasd')
  })
  app.use(errorHandler)
  app.listen(SERVER_PORT, cb)
}

async function main() {
  setupLogStash({
    debugNamespace: ROOT_APP_NAMESPACE
  })

  try {
    await initDatabaseConnection()
    await initialize(() => {
      debug.log(ROOT_APP_NAMESPACE, 'Server run at ' + SERVER_PORT)
    })
  }
  catch (err) {
    debug.log(ROOT_APP_NAMESPACE, 'Something error when start app! ', err)
    process.exit(1)
  }
}

main()
