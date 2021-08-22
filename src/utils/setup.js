import debug from 'debug'
import db from '../core/db'

export function setupLogStash(options) {
  const {debugNamespace = '*'} = options
  debug.enable(debugNamespace)
}

export async function initDatabaseConnection() {
  const ns = 'pg:connection'
  debug.log(ns, 'Connecting to database server...')
  await db.authenticate()
  debug.log(ns, 'Connection granted.')
  
  return db.sync()
}

export function combineRouters(app, routers) {
  for (const router of Object.values(routers)) {
    const {prefix, routerInstance} = router
    app.use(prefix, routerInstance)
  }
}
