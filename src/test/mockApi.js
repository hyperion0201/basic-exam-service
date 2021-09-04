import express from 'express'
import { errorHandler } from '../middlewares/error'
import { combineRouters } from '../utils/setup'

export default (controller, SERVER_PORT = 3333, cb) => {
  const app = express()

  // register middlewares
  app.use(express.json())
  combineRouters(app, controller)

  // error middleware should be register at the end of express instance.
  app.use(errorHandler)
  return app.listen(SERVER_PORT, cb)
}
